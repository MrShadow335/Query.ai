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
    embedding_function=embedding_model,
    connection_args={"uri": db_file},
    auto_id=True,
    index_params={"index_type": "AUTOINDEX"},
    embedding_function: Embeddings,
    collection_name: str = 'LangChainCollection',
    collection_description: str = '',
    collection_properties: dict[str, Any] | None = None,
    connection_args: dict[str, Any] | None = None,
    consistency_level: str = 'Session',
    index_params: dict | None = None,
    search_params: dict | None = None,
    drop_old: bool | None = False,
    auto_id: bool = False,
)



# Load and index documents
file_paths = ["insurance_policy_v3.pdf", "exclusions_clause.docx"]
docs = load_and_split_documents(file_paths)
vectorstore = FAISS.from_documents(docs, embedding_model)



