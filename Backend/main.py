from fastapi import FastAPI, Request, HTTPException
from fastapi import File, UploadFile
import uvicorn
from typing import List, Dict, Any

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import os
import google.generativeai as genai
from config import get_settings
from database import get_user_data, save_user_message
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.memory import ConversationBufferWindowMemory
from langchain.schema import HumanMessage, AIMessage
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import ConversationChain



# ====================================
# FASTAPI APPLICATION SETUP
# ====================================
app = FastAPI(
    title="Query.AI chatbot",
    description="LangChain-powered Query chatbot with Gemini API",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI at /docs
    redoc_url="/redoc"  # ReDoc at /redoc
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize chatbot
chatbot = QueryChatbot()

@app.on_event("startup")
async def startup_event():
    """Startup event to validate configuration"""
    if not Config.GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY environment variable is required")
    print(f"🚀 Query.AI Chatbot started successfully!")
    print(f"📚 Ready to help businesses grow!")

# ====================================
# FASTAPI ENDPOINTS
# ====================================

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint - API status"""
    return {
        "message": "🎓 Query Chatbot API is running!",
        "status": "active",
        "model": Config.MODEL_NAME,
        "context_messages": Config.MAX_CONTEXT_MESSAGES,
        "docs": "/docs",
        "health": "/health"
    }

@app.post("/chat", response_model=ChatResponse, tags=["Chat"])
async def chat_endpoint(chat_message: ChatMessage):
    """Main chat endpoint"""
    try:
        response = await chatbot.get_response(
            message=chat_message.message,
            user_id=chat_message.user_id
        )
        
        return ChatResponse(
            response=response,
            timestamp=datetime.now().isoformat(),
            user_id=chat_message.user_id
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history/{user_id}", tags=["History"])
async def get_chat_history(user_id: str):
    """Get conversation history for a specific user"""
    history = chatbot.get_conversation_history(user_id)
    return {
        "user_id": user_id,
        "history": history,
        "total_messages": len(history)
    }

@app.delete("/history/{user_id}", tags=["History"])
async def clear_chat_history(user_id: str):
    """Clear conversation history for a specific user"""
    success = chatbot.clear_user_memory(user_id)
    return {
        "user_id": user_id,
        "cleared": success,
        "message": "Conversation history cleared successfully!" if success else "No history found for user"
    }

@app.get("/users", tags=["Users"])
async def get_active_users():
    """Get list of all users with active conversations"""
    return {
        "active_users": list(chatbot.user_memories.keys()),
        "total_users": len(chatbot.user_memories)
    }

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model": Config.MODEL_NAME
    }

# ====================================
# RUN SERVER
# ====================================
if __name__ == "__main__":
    print("🎓 Starting Query.AI Chatbot Server...")
    print("📋 Make sure to set your GEMINI_API_KEY environment variable!")
    print(f"🌐 Server will run on http://{Config.HOST}:{Config.PORT}")
    
    uvicorn.run(
        "main:app",  # Replace "main" with your actual filename
        host=Config.HOST,
        port=Config.PORT,
        reload=True,
        # log_level="info"
    )

# Example client code for testing
"""
Example usage with requests:

import requests

# Send a chat message
response = requests.post("http://localhost:8000/chat", json={
    "message": "Explain photosynthesis to me",
    "user_id": "student_123"
})

print(response.json())

# Get chat history
history = requests.get("http://localhost:8000/history/student_123")
print(history.json())
"""
output = rag_chain.invoke({"input": query})

print(output['answer'])
