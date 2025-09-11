import React, { useState } from 'react';

const MOCKAPI_CONTACT_URL = import.meta.env.VITE_MOCKAPI_CONTACT_URL || 'https://mockapi.io/your-endpoint/contacts';

const Contacto = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    comentario: ''
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const validar = (campo, valor) => {
    if (!valor) return 'Este campo es obligatorio';
    if (campo === 'email' && !/\S+@\S+\.\S+/.test(valor)) return 'Email inválido';
    if (campo === 'comentario' && valor.length < 10) return 'Mínimo 10 caracteres';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrores({ ...errores, [name]: validar(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación final
    const nuevosErrores = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, validar(k, v)])
    );
    setErrores(nuevosErrores);
    const hayErrores = Object.values(nuevosErrores).some(Boolean);
    if (hayErrores) return;

    setEnviando(true);
    setFeedback(null);
    try {
      const res = await fetch(MOCKAPI_CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          comentario: form.comentario,
          fecha: new Date().toISOString()
        })
      });
      if (!res.ok) throw new Error('No se pudo enviar el formulario');
      setFeedback({ tipo: 'success', msg: '¡Mensaje enviado! Te responderemos a la brevedad.' });
      setForm({ nombre: '', email: '', comentario: '' });
    } catch (err) {
      setFeedback({ tipo: 'error', msg: 'Ocurrió un error al enviar. Intentá nuevamente.' });
    } finally {
      setEnviando(false);
    }
  };

  const campos = [
    { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
    { name: 'comentario', label: 'Comentario', type: 'textarea', placeholder: '¿En qué podemos ayudarte?' },
  ];

  return (
    <main className="contacto container">
      <h1>Contacto</h1>
      <p>Dejanos tu consulta y te contactamos.</p>

      <form className="contacto__form" onSubmit={handleSubmit} noValidate>
        {campos.map(({ name, label, type, placeholder }) => (
          <div className="contacto__campo" key={name}>
            <label htmlFor={name}>{label}</label>
            {type === 'textarea' ? (
              <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errores[name]}
                aria-describedby={errores[name] ? `${name}-error` : undefined}
              />
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errores[name]}
                aria-describedby={errores[name] ? `${name}-error` : undefined}
              />
            )}
            {errores[name] && <span id={`${name}-error`} className="contacto__error">{errores[name]}</span>}
          </div>
        ))}
        <button type="submit" className="contacto__submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar'}
        </button>
        {feedback && (
          <div className={`contacto__feedback ${feedback.tipo}`} role="status">
            {feedback.msg}
          </div>
        )}
      </form>
    </main>
  );
};

export default Contacto;
