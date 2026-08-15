import React, { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi there! I'm Northstar's automated assistant. How can I help you reduce your wait time today?" }
  ]);
  const [step, setStep] = useState('menu');
  const [inputVal, setInputVal] = useState('');

  const handleOptionSelect = (option) => {
    if (option === 'order') {
      setMessages(prev => [
        ...prev, 
        { sender: 'user', text: "Where is my order?" },
        { sender: 'bot', text: "Please enter your Order ID (e.g., NS-5849) below:" }
      ]);
      setStep('order_lookup');
    } else if (option === 'return') {
      setMessages(prev => [
        ...prev, 
        { sender: 'user', text: "I need help with a return or refund." },
        { sender: 'bot', text: "What is the reason for your return?", options: ['Wrong size / Don’t like it', 'Item damaged/defective'] }
      ]);
      setStep('return_flow');
    } else if (option === 'human') {
      setMessages(prev => [
        ...prev, 
        { sender: 'user', text: "Talk to a human agent" },
        { sender: 'bot', text: "All agents are currently busy. Our automated tool can resolve your request instantly! Try checking your order status above to skip the queue." }
      ]);
      setStep('menu');
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const orderId = inputVal;
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: orderId },
      { sender: 'bot', text: `Found it! Order #${orderId.toUpperCase()} shipped via courier yesterday. Estimated delivery: Tomorrow by 4:00 PM.` }
    ]);
    setInputVal('');
    setStep('menu');
  };

  const handleReturnReason = (reason) => {
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: reason },
      { sender: 'bot', text: `Got it. A prepaid return label for this issue has been generated and sent to your registered email!` }
    ]);
    setStep('menu');
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatHeader}>
        <h3 style={{margin: 0}}>Northstar Support Bot</h3>
        <span style={styles.statusBadge}>● Deflection Active</span>
      </div>

      <div style={styles.messageArea}>
        {messages.map((msg, index) => (
          <div key={index} style={{ ...styles.messageBubble, ...(msg.sender === 'user' ? styles.userMsg : styles.botMsg) }}>
            {msg.text}
            {msg.options && step === 'return_flow' && (
              <div style={styles.optionContainer}>
                {msg.options.map((opt, i) => (
                  <button key={i} style={styles.optionBtn} onClick={() => handleReturnReason(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        {step === 'menu' && (
          <div style={styles.menuButtonGroup}>
            <button style={styles.menuBtn} onClick={() => handleOptionSelect('order')}>📦 Where is my order?</button>
            <button style={styles.menuBtn} onClick={() => handleOptionSelect('return')}>🔄 Returns & Refunds</button>
            <button style={styles.menuBtn} onClick={() => handleOptionSelect('human')}>📞 Talk to a human</button>
          </div>
        )}

        {step === 'order_lookup' && (
          <form onSubmit={handleSubmitOrder} style={styles.formStyle}>
            <input 
              type="text" 
              placeholder="Type Order ID..." 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={styles.textInput}
            />
            <button type="submit" style={styles.submitBtn}>Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  chatContainer: { width: '380px', height: '520px', background: '#1e1e2f', color: '#fff', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', fontFamily: 'sans-serif', margin: '40px auto' },
  chatHeader: { padding: '16px', background: '#252538', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  statusBadge: { fontSize: '11px', color: '#4ade80' },
  messageArea: { flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' },
  messageBubble: { maxWidth: '80%', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', lineHeight: '1.4' },
  botMsg: { background: '#2d2d44', alignSelf: 'flex-start' },
  userMsg: { background: '#4f46e5', alignSelf: 'flex-end' },
  inputArea: { padding: '12px', background: '#252538', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' },
  menuButtonGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  menuBtn: { background: '#3b3b54', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontSize: '13px' },
  optionContainer: { display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' },
  optionBtn: { background: '#4f46e5', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', textAlign: 'left' },
  formStyle: { display: 'flex', gap: '8px' },
  textInput: { flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #444', background: '#151522', color: '#fff', outline: 'none' },
  submitBtn: { background: '#4f46e5', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' }
};