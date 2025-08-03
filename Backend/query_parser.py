from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import HuggingFaceHub  # or OpenAI, Anthropic, etc.

# Initialize LLM (example using Hugging Face Inference API)
llm = HuggingFaceHub(
    repo_id="mistralai/Mistral-7B-Instruct-v0.2",
    model_kwargs={"temperature": 0.2}
)

# Prompt to structure the query
structure_prompt = PromptTemplate.from_template("""
Extract structured information from the following healthcare insurance query.
Return JSON format only.

Fields to extract:
- age (int)
- gender (str: M/F)
- procedure (str)
- location (str)
- policy_duration_months (int)

Query: {query}

Output:""")

structure_chain = LLMChain(llm=llm, prompt=structure_prompt)

# Example usage
query = "46M, knee surgery, Pune, 3-month policy"
structured_input = structure_chain.run(query)
# Output (parsed): {"age": 46, "gender": "M", "procedure": "knee surgery", "location": "Pune", "policy_duration_months": 3}