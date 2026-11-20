import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Login() {
  const { login, register, notify } = useApp();
  const nav = useNavigate();
  const [reg, setReg] = useState(false);
  const [f, setF] = useState({ name: '', email: '', password: '' });

  const submit = e => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(f.email) || f.password.length < 6 || (reg && !f.name)) {
      return notify('Enter valid details (password 6+ chars)');
    }

    const ok = reg ? register(f) : login(f.email, f.password);
    ok ? nav('/') : notify(reg ? 'Email already used' : 'Invalid credentials');
  };

  return (
    <main className="auth">
      <form className="auth-card" onSubmit={submit}>
        <header className="auth-heading">
          <span className="auth-brand-mark" aria-hidden="true">
            <BookOpenCheck size={19} strokeWidth={1.9} />
          </span>
          <h1>QuizMaster</h1>
          <p>{reg ? 'Create your student account' : 'Sign in to continue learning'}</p>
        </header>

        <div className="auth-fields">
          {reg && (
            <label className="auth-field">
              <span>Full name</span>
              <input
                autoComplete="name"
                placeholder="Your name"
                value={f.name}
                onChange={e => setF({ ...f, name: e.target.value })}
              />
            </label>
          )}
          <label className="auth-field">
            <span>Email</span>
            <input
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              value={f.email}
              onChange={e => setF({ ...f, email: e.target.value })}
            />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              autoComplete={reg ? 'new-password' : 'current-password'}
              placeholder="Enter your password"
              value={f.password}
              onChange={e => setF({ ...f, password: e.target.value })}
            />
          </label>
        </div>

        <div className="auth-actions">
          <button className="btn auth-submit" type="submit">
            {reg ? 'Register' : 'Login'}
          </button>
          <button className="auth-switch" type="button" onClick={() => setReg(!reg)}>
            {reg ? 'Have an account? Login' : 'New student? Register'}
          </button>
        </div>

        <section className="auth-demo" aria-label="Demo account credentials">
          <p className="auth-demo-title">Try a demo account</p>
          <p><span>Admin</span><code>admin@quiz.com / admin123</code></p>
          <p><span>Student</span><code>asha@quiz.com / stud123</code></p>
        </section>
      </form>
    </main>
  );
}
