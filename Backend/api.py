from fastapi import FastAPI, File, UploadFile, HTTPException
from main import query_rag_system
from typing import List, Dict, Any
import uvicorn

app = FastAPI()

@app.post("/query")
async def query_endpoint(question: str):
    result = query_rag_system(question)
    return {"answer": result}

@app.post("/process_query/")
async def process_query(
    query: str,
    documents: List[UploadFile]  
) -> Dict[str, Any]:
    """
    Process a natural language query and documents, return a structured response.
    """
    structured_query = parse_query(query)  

    full_texts = [await extract_text(file) for file in documents] 

    relevant_clauses = find_relevant_clauses(structured_query, full_texts)  

    decision, amount, justification, clause_mapping = evaluate_logic(structured_query, relevant_clauses)  

    return {
        "decision": decision,
        "amount": amount,
        "justification": justification,
        "clause_mapping": clause_mapping
    }

# --------- Utility Functions to be implemented ----------

def parse_query(query: str) -> Dict[str, Any]:
    pass

async def extract_text(file: UploadFile) -> str:
    pass

def find_relevant_clauses(query_details: Dict, texts: List[str]) -> List[str]:
    pass

def evaluate_logic(query_details, clauses):
    pass

# ------------- Run Server -------------
if __name__ == "__main__":
    uvicorn.run("your_script:app", host="0.0.0.0", port=8000)

