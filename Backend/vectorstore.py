import getpass
import os
import tempfile


if not os.environ.get("GOOGLE_API_KEY"):
  os.environ["GOOGLE_API_KEY"] = getpass.getpass("Enter API key for Google Gemini: ")

from langchain_google_genai import GoogleGenerativeAIEmbeddings

embedding_model = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")


from langchain_milvus import Milvus


db_file = tempfile.NamedTemporaryFile(prefix="milvus_", suffix=".db", delete=False).name
print(f"The vector database will be saved to {db_file}")

vector_db = Milvus(
    embedding_function=embeddings_model,
    connection_args={"uri": db_file},
    auto_id=True,
    index_params={"index_type": "AUTOINDEX"},
)



# Load and index documents
file_paths = ["insurance_policy_v3.pdf", "exclusions_clause.docx"]
docs = load_and_split_documents(file_paths)
vectorstore = FAISS.from_documents(docs, embedding_model)
