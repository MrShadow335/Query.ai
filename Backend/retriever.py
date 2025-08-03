from langchain.chains.retrieval import create_retrieval_chain
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})  # top 5 most relevant chunks

def retrieve_clauses(query):
    relevant_docs = retriever.get_relevant_documents(query)

    return [doc.page_content for doc in relevant_docs]

from langchain_google_genai import ChatGoogleGenerativeAI

model = ChatGoogleGenerativeAI(model="gemini-pro")
combine_docs_chain = create_stuff_documents_chain(
    llm=model,  # Correct
    prompt=prompt_template,
)

rag_chain = create_retrieval_chain(
    retriever=vector_db.as_retriever(),
    combine_docs_chain=combine_docs_chain,
)


