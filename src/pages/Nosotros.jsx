import React, { useEffect, useState } from 'react';

/**
 * Página Nosotros
 * - Usa hooks (useState, useEffect)
 * - Contenido responsive con grid simple
 * - Accesible y con títulos/alt adecuados
 */
const Nosotros = () => {
  const [equipo, setEquipo] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    document.title = 'Nosotros | Juguetería Cósmica';
    // Simulamos carga asíncrona (podrías reemplazar por fetch a una API)
    const timer = setTimeout(() => {
      setEquipo([
        { id: 1, nombre: 'Mabel', rol: 'Fundadora', desc: 'Apasionada por el diseño y la experiencia de usuario.' },
        { id: 2, nombre: 'Lautaro', rol: 'Fullstack Dev', desc: 'Le da vida a las ideas con React y Node.' },
        { id: 3, nombre: 'Sofi', rol: 'Soporte', desc: 'Acompaña a clientes y resuelve dudas con paciencia.' },
      ]);
      setCargando(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="nosotros container" aria-live="polite">
      <header className="nosotros__header">
        <h1>Sobre nosotros</h1>
        <p>
          En <strong>Juguetería Cósmica</strong> creemos en juguetes creativos y accesibles.
          Trabajamos con foco en calidad, seguridad y aprendizaje lúdico.
        </p>
      </header>

      {cargando ? (
        <p className="nosotros__loading">Cargando equipo...</p>
      ) : (
        <section className="nosotros__grid" role="list">
          {equipo.map(persona => (
            <article key={persona.id} className="nosotros__card" role="listitem" tabIndex="0">
              <div className="nosotros__avatar" aria-hidden="true">👩‍🚀</div>
              <h3 className="nosotros__name">{persona.nombre}</h3>
              <p className="nosotros__role">{persona.rol}</p>
              <p className="nosotros__desc">{persona.desc}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Nosotros;
