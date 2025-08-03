retriever = vectorstore.as_retriever(search_kwargs={"k": 5})  # top 5 most relevant chunks

def retrieve_clauses(query):
    relevant_docs = retriever.get_relevant_documents(query)
    return [doc.page_content for doc in relevant_docs]