import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

function safeJSONParse(input: string): any | null {
  try {
    return JSON.parse(input);
  } catch (e) {
    // Attempt to fix improperly escaped quotes inside strings
    const fixed = input
      .replace(/\\n/g, "")                      // remove newlines
      .replace(/“|”/g, '"')                    // convert curly quotes
      .replace(/(\w)"(\w)/g, "$1'$2")          // fix double quotes inside words
      .replace(/([,:])\s*"(.*?)"\s*(?=[,}])/g, (match, p1, p2) => {
        // escape inner quotes
        return `${p1} "${p2.replace(/"/g, '\\"')}"`;
      });

    try {
      return JSON.parse(fixed);
    } catch (err2) {
      console.log("safeJSONParse still failed:\n", fixed);
      return null;
    }
  }
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-4o-mini",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
): Promise<
  {
    question: string;
    answer: string;
    [key: string]: string;
  }[]
> {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));
  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output the following in json format: ${JSON.stringify(
      output_format
    )}. \nDo not escape quotation marks unnecessarily.`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\nText enclosed by < and > must be replaced appropriately. Example: Go to <location> → Go to the park.`;
    }

    if (list_input) {
      output_format_prompt += `\nReturn a JSON array, one object for each input.`;
    }

    const response = await openai.createChatCompletion({
      temperature: temperature,
      model: model,
      messages: [
        {
          role: "system",
          content: system_prompt + output_format_prompt + error_msg,
        },
        { role: "user", content: user_prompt.toString() },
      ],
    });

    let res: string = response.data.choices[0].message?.content ?? "";

    if (verbose) {
      console.log(
        "System prompt:",
        system_prompt + output_format_prompt + error_msg
      );
      console.log("\nUser prompt:", user_prompt);
      console.log("\nGPT response:", res);
    }

    try {
      let output: any = safeJSONParse(res);
      if (!output) throw new Error("Could not parse GPT output");

      if (list_input && !Array.isArray(output)) {
        throw new Error("Output format not in a list of json");
      } else if (!list_input) {
        output = [output];
      }

      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          if (/<.*?>/.test(key)) continue;
          if (!(key in output[index])) throw new Error(`${key} not in json output`);

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            if (typeof output[index][key] === "string" && output[index][key].includes(":")) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

        if (output_value_only) {
          output[index] = Object.values(output[index]);
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
      console.log("An exception occurred:", e);
      console.log("Current invalid json format:", res);
    }
  }

  return [];
}
