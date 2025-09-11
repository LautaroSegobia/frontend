
import React, { useState, useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { useNavigate } from 'react-router-dom';

const Alta = () => {
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    stock: '',
    marca: '',
    categoria: '',
    descripcionCorta: '',
    descripcionLarga: '',
    envio: false,
    edadDesde: '',
    edadHasta: '',
    foto: ''
  });

  const [errores, setErrores] = useState({});
  const { crearProducto } = useContext(ProductosContext);
  const navigate = useNavigate();

  const validarCampo = (nombre, valor) => {
    let error = '';
    if (!valor && nombre !== 'envio') error = 'Este campo es obligatorio.';
    if (nombre === 'precio' && valor <= 0) error = 'El precio debe ser mayor que 0.';
    if (nombre === 'stock' && valor < 0) error = 'El stock no puede ser negativo.';
    if (nombre === 'edadHasta' && parseInt(valor) < parseInt(form.edadDesde))
      error = 'Edad hasta no puede ser menor que edad desde.';
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nuevoValor = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: nuevoValor });

    const error = validarCampo(name, nuevoValor);
    setErrores({ ...errores, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    for (const campo in form) {
      const error = validarCampo(campo, form[campo]);
      if (error) nuevosErrores[campo] = error;
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) {
      await crearProducto(form);
      alert('Producto creado correctamente!');
      navigate('/');
    }
  };

  return (
    <main className="alta">
      <h1>Alta de Producto</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        {[
          { name: 'nombre', label: 'Nombre' },
          { name: 'precio', label: 'Precio', type: 'number' },
          { name: 'stock', label: 'Stock', type: 'number' },
          { name: 'marca', label: 'Marca' },
          { name: 'categoria', label: 'Categoría' },
          { name: 'descripcionCorta', label: 'Descripción corta' },
          { name: 'descripcionLarga', label: 'Descripción larga' },
          { name: 'edadDesde', label: 'Edad desde', type: 'number' },
          { name: 'edadHasta', label: 'Edad hasta', type: 'number' },
          { name: 'foto', label: 'URL de foto' }
        ].map(({ name, label, type = 'text' }) => (
          <div key={name} className="formulario__campo">
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              onBlur={(e) => {
                const error = validarCampo(name, e.target.value);
                setErrores({ ...errores, [name]: error });
              }}
            />
            {errores[name] && <span className="formulario__error">{errores[name]}</span>}
          </div>
        ))}

        <div className="formulario__campo">
          <label>
            <input
              type="checkbox"
              name="envio"
              checked={form.envio}
              onChange={handleChange}
            />{' '}
            Envío sin cargo
          </label>
        </div>

        <button type="submit" className="formulario__submit">Crear producto</button>
      </form>
    </main>
  );
};

await apiFetch("/api/products", {
  method: "POST",
  body: JSON.stringify(nuevoProducto),
});

await apiFetch(`/api/products/${id}`, {
  method: "PUT",
  body: JSON.stringify(datos),
});

await apiFetch(`/api/products/${id}`, { method: "DELETE" });

export default Alta;
