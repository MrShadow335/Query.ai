from langchain_mongodb.chat_message_histories import MongoDBChatMessageHistory

chat_message_history = MongoDBChatMessageHistory(
    session_id="test_session",
    connection_string="mongodb://mongo_user:password123@mongo:27017",
    database_name="my_db",
    collection_name="chat_histories",
)

chat_message_history.add_user_message("Hello")
chat_message_history.add_ai_message("Hi")

chat_message_history.messages

[HumanMessage(content='Hello'), AIMessage(content='Hi')]

#CHAINING
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_openai import ChatOpenAI

#API Reference:ChatPromptTemplate | MessagesPlaceholder | RunnableWithMessageHistory
import os

assert os.environ["OPENAI_API_KEY"], (
    "Set the OPENAI_API_KEY environment variable with your OpenAI API key."
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant."),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{question}"),
    ]
)

chain = prompt | ChatOpenAI()

chain_with_history = RunnableWithMessageHistory(
    chain,
    lambda session_id: MongoDBChatMessageHistory(
        session_id=session_id,
        connection_string="mongodb://mongo_user:password123@mongo:27017",
        database_name="my_db",
        collection_name="chat_histories",
    ),
    input_messages_key="question",
    history_messages_key="history",
)

# This is where we configure the session id
config = {"configurable": {"session_id": "<SESSION_ID>"}}

chain_with_history.invoke({"question": "Hi! I'm bob"}, config=config)

AIMessage(content='Hi Bob! How can I assist you today?')

chain_with_history.invoke({"question": "Whats my name"}, config=config)

AIMessage(content='Your name is Bob. Is there anything else I can help you with, Bob?')     
