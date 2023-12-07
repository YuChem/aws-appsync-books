import { Tool } from "ai-jsx/batteries/use-tools";
import { YourSidekickSystemMessage } from "./system-message.js";
import { FixieCorpus } from "ai-jsx/batteries/docs";
import { Sidekick, SidekickProps } from "ai-jsx/sidekick";
import { OpenAI } from "ai-jsx/lib/openai";

//TODO: Replace with your Fixie Corpus ID
// This Corpus contains information about foxes. Some suggested queries to try once
// you deploy this sidekick are:
//    tell me about foxes and what they eat
//    what is the fennec fox like? how big do they get?
//    who is foxie?
const FIXIE_CORPUS_ID = process.env.FIXIE_CORPUS_ID;
if (!FIXIE_CORPUS_ID) {
  throw new Error("Please set the environment variable FIXIE_CORPUS_ID");
}

const APPSYNC_API_KEY = process.env.APPSYNC_API_KEY;
if (!APPSYNC_API_KEY) {
  throw new Error('Please set the environment variable APPSYNC_API_KEY');
}

const systemMessage = <YourSidekickSystemMessage />;

const tools: Record<string, Tool> = {
  // TODO: To help the model understand when to call this tool, name the function
  // something more descriptive like 'lookUpAcmeCompanyKnowledgeBase'.
  // For more tips on using Tools, see: https://docs.ai-jsx.com/tutorials/aijsxTutorials/part7-tools
  lookUpKnowledgeBase: FixieCorpus.createTool(
    FIXIE_CORPUS_ID,
    "A tool for looking up additional information to help answer the user query."
  ),
  runGraphqlQuery: {
    description: 'Run a GraphQL query against the Library API',
    parameters: {
      query: {
        description: 'The GraphQL query to run',
        type: 'string',
        required: true,
      },
    },
    func: async ({ query }: { query: string }) => {
      console.log(`GQL: ${query}`)
      const response = await fetch('https://ggps6z3sczh4fefsy5qfwyscnu.appsync-api.us-east-1.amazonaws.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/graphql',
          'x-api-key': `${APPSYNC_API_KEY}`,
        },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        console.error(`API request failed: ${response.status} ${response.statusText}:\n`, await response.json());
        throw new Error(`API request failed: ${response.status} ${response.statusText} ${response.body}`);
      }
      return response.text();
    }
  }
};

export default function SidekickTemplate() {
  return (
    <OpenAI chatModel="gpt-4-32k">
      <Sidekick
        systemMessage={systemMessage}
        tools={tools}
        outputFormat="text/mdx"
        includeNextStepsRecommendations
        useCitationCard
      />
    </OpenAI>
    
  );
}
