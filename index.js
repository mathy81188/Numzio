
// === Referencias generales ===
const formMobile = document.getElementById("navForm");
const formDesktop = document.getElementById("navFormDesktop");
const resultContent = document.getElementById("resultContent");
const modal = new bootstrap.Modal(document.getElementById("resultModal"));
const subir = document.getElementById("subir");

const mainNumberMobile = document.getElementById("mainNumber");
const secondNumberMobile = document.getElementById("secondNumber");
const actionMobile = document.getElementById("action");

const mainNumberDesktop = document.getElementById("mainNumberDesktop");
const secondNumberDesktop = document.getElementById("secondNumberDesktop");
const actionDesktop = document.getElementById("actionDesktop");

// === Función común para mostrar resultados ===
function mostrarResultado(texto) {
  resultContent.innerHTML = texto.replace(/\n/g, "<br>");
  modal.show();
}

// === Lógica principal de acciones ===
function procesarAccion(num1, num2, accion) {
  if (isNaN(num1) || (["coprimo", "multiplos-comunes", "divisores-comunes"].includes(accion) && isNaN(num2))) {
    return "Por favor ingresá números válidos.";
  }

  let result = "";

  switch (accion) {
    case "tipo":
      result = `El número ${num1} pertenece a:\n`;
      if (num1 >= 0) result += "- ℕ (Naturales)\n";
      result += "- ℤ (Enteros)\n- ℚ (Racionales)\n- ℝ (Reales)\n";
      if (num1 >= 2) result += `\nAdemás, ${num1} ${esPrimo(num1) ? "es primo" : "no es primo"}.`;
      break;

    case "primo":
      result = num1 < 2
        ? `${num1} no es primo.\nRecordá que los primos empiezan en 2.`
        : `${num1} ${esPrimo(num1) ? "es primo" : "no es primo"}.`;
      break;

    case "divisores":
      const divisoresNum1 = divisores(num1);
      const total = divisoresNum1.length;
      const primeros = divisoresNum1.slice(0, 10);
      result = `El número ${num1} tiene ${total} divisor${total > 1 ? "es" : ""}.\n`;
      result += total > 10
        ? ` Mostrando los primeros 10:\n ${primeros.join(", ")}.`
        : ` ${divisoresNum1.join(", ")}.`;
      break;

    case "multiplos":
      result = `Primeros 10 múltiplos de ${num1}:\n ${multiplos(num1, 10).join(", ")}.`;
      break;

    case "coprimo":
      result = `${num1} y ${num2} ${sonCoprimos(num1, num2) ? "son coprimos" : "no son coprimos"}.`;
      break;

    case "multiplos-comunes":
      const m1 = multiplos(num1, 100);
      const m2 = multiplos(num2, 100);
      const comunesM = m1.filter(n => m2.includes(n));
      result = comunesM.length > 0
        ? `Primeros múltiplos en común entre ${num1} y ${num2}:\n${comunesM.slice(0, 10).join(", ")}.`
        : `No se encontraron múltiplos en común en los primeros 100 múltiplos.`;
      break;

    case "divisores-comunes":
      const d1 = divisores(num1);
      const d2 = divisores(num2);
      const comunesD = d1.filter(n => d2.includes(n));
      result = comunesD.length > 0
        ? `Divisores en común entre ${num1} y ${num2}:\n${comunesD.join(", ")}.`
        : `No tienen divisores en común.`;
      break;

    default:
      result = "Acción no válida.";
  }

  return result;
}

// === Control dinámico del segundo input (mobile y desktop) ===
function toggleSegundoInput(select, input) {
  select.addEventListener("change", () => {
    const necesitaSegundo = ["coprimo", "multiplos-comunes", "divisores-comunes"].includes(select.value);
    input.classList.toggle("d-none", !necesitaSegundo);
    input.required = necesitaSegundo;
    if (!necesitaSegundo) input.value = "";
  });
}
toggleSegundoInput(actionMobile, secondNumberMobile);
toggleSegundoInput(actionDesktop, secondNumberDesktop);

// === Manejo de formularios (mobile y desktop) ===
formMobile.addEventListener("submit", function (e) {
  e.preventDefault();
  const num1 = parseInt(mainNumberMobile.value);
  const num2 = parseInt(secondNumberMobile.value);
  const accion = actionMobile.value;
  const resultado = procesarAccion(num1, num2, accion);
  mostrarResultado(resultado);
});

formDesktop.addEventListener("submit", function (e) {
  e.preventDefault();
  const num1 = parseInt(mainNumberDesktop.value);
  const num2 = parseInt(secondNumberDesktop.value);
  const accion = actionDesktop.value;
  const resultado = procesarAccion(num1, num2, accion);
  mostrarResultado(resultado);
});

// === Cierre automático del menú hamburguesa en mobile ===
const navbarCollapse = document.querySelector(".navbar-collapse");
if (navbarCollapse.classList.contains("show")) {
  const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
  bsCollapse.hide();
}

// === Control de acordeones (placeholder para tu lógica) ===
document.addEventListener("DOMContentLoaded", function () {
  const btnToggle = document.getElementById("btn-toggle");
  const panels = document.querySelectorAll(".accordion-collapse");

  function actualizarTextoBoton() {
    const algunoAbierto = Array.from(panels).some(panel =>
      panel.classList.contains("show")
    );
    btnToggle.textContent = algunoAbierto
      ? "Cerrar acordeones"
      : "Abrir acordeones";
  }
 // Click en el botón para abrir/cerrar acordeones

  btnToggle?.addEventListener("click", function () {
    const algunoAbierto = Array.from(panels).some(panel =>
      panel.classList.contains("show")
    );

    panels.forEach(panel => {
      const bsAcc = bootstrap.Collapse.getOrCreateInstance(panel);
      algunoAbierto ? bsAcc.hide() : bsAcc.show();
    });
  });

  // Escuchar cuando cada panel se abre o se cierra
  panels.forEach(panel => {
    panel.addEventListener("shown.bs.collapse", actualizarTextoBoton);
    panel.addEventListener("hidden.bs.collapse", actualizarTextoBoton);
  });

  // Inicializamos el texto del botón correctamente
  actualizarTextoBoton();
});


// === Control del botón "Volver arriba" y "Ir abajo" ===
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnVolverArriba");
  const icon = document.getElementById("btnIcon");
  const main = document.getElementById("main");
  const footer = document.querySelector("footer");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      icon.className = "bi bi-chevron-up fs-3";
      btn.title = "Volver arriba";
    } else {
      icon.className = "bi bi-chevron-down fs-3";
      btn.title = "Ir abajo";
    }
  });

  btn.addEventListener("click", () => {
    if (window.scrollY > 200) {
      // Subir al top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Bajamos hasta justo antes del footer
      const footerTop = window.scrollY + footer.getBoundingClientRect().top;
      // quede 30px por encima del inicio del footer
      const target = footerTop - window.innerHeight - 30;
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  });
});

// === Control de limpieza de form de contacto post envio ===

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('form[action*="formspree"]');

  // Elementos del Toast
  const toastElement = document.getElementById('liveToast');
  const toastMessage = document.getElementById('toast-message');

  // Inicializamos el componente Toast de Bootstrap
  const bsToast = new bootstrap.Toast(toastElement);

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset(); // Vaciamos el formulario

          // Configuramos el Toast de Éxito
          toastMessage.textContent = "¡Mensaje enviado con éxito!";
          toastElement.className = "toast align-items-center text-white bg-success border-0 show";
          bsToast.show();
        } else {
          throw new Error();
        }
      } catch (error) {
        // Configuramos el Toast de Error
        toastMessage.textContent = "Error al enviar. Intenta de nuevo.";
        toastElement.className = "toast align-items-center text-white bg-danger border-0 show";
        bsToast.show();
      }
    });
  }
});


// === Funciones auxiliares ===
function esPrimo(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function divisores(n) {
  const resultado = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) resultado.push(i);
  }
  return resultado;
}

function multiplos(n, cantidad) {
  const resultado = [];
  for (let i = 1; i <= cantidad; i++) {
    resultado.push(n * i);
  }
  return resultado;
}

function sonCoprimos(a, b) {
  function mcd(x, y) {
    return y === 0 ? x : mcd(y, x % y);
  }
  return mcd(a, b) === 1;
}
