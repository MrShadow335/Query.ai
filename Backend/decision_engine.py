decision_prompt = PromptTemplate.from_template("""
You are an insurance claims adjudication system.

Based on the following policy clauses and the patient's details, determine:
- Whether the claim should be APPROVED or REJECTED
- If approved, suggest a payout amount (default ₹50,000 for standard surgery)
- Provide a justification citing exact phrases from the clauses

### Policy Clauses:
{clauses}

### Patient Details:
- Age: {age}
- Gender: {gender}
- Procedure: {procedure}
- Location: {location}
- Policy Duration (months): {duration}

### Rules:
- Policies under 24 months do NOT cover knee/joint replacement surgeries.
- Only emergency orthopedic care is allowed before 24 months.
- Non-emergency knee surgery requires ≥2 years of coverage.

Return response in strict JSON format:
{
  "decision": "approved/rejected",
  "amount": number or null,
  "justification": "string with clause references"
}
""")

decision_chain = LLMChain(llm=llm, prompt=decision_prompt)

# Run decision
clauses_text = "\n\n".join(retrieve_clauses(query))
result = decision_chain.run(
    clauses=clauses_text,
    age=46,
    gender="M",
    procedure="knee surgery",
    location="Pune",
    duration=3
)