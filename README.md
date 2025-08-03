# Query.AI
A highly Interactive RAG system that uses Large Language Models (LLMs) to process natural language queries and retrieve relevant information from large unstructured documents such as policy documents, contracts, and emails.

### Features

#### (i)Parsed Query:
Input documents may include PDFs, Word files, or emails. It Parse and structure the query to identify key details such as age, procedure, location, and policy duration even if the query is vague, incomplete, or written in plain English.

#### (ii) Semantic Search:
Search and retrieve relevant clauses or rules from the provided documents using semantic understanding rather than simple keyword matching.

#### (iii) Highly efficienct decision Engine:
Evaluate the retrieved information to determine the correct decision, such as approval status or payout amount, based on the logic defined in the clauses.

#### (iv) Structured Output:
Return a structured JSON response containing: Decision (e.g., approved or rejected), Amount (if applicable), and Justification, including mapping of each decision to the specific clause(s) it was based on. The output is consistent, interpretable, and usable for downstream applications such as claim processing or audit tracking.


### Applications:
This system can be applied in domains such as insurance, legal compliance, human resources, and contract management.

