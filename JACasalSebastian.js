const mostrarFrase = (frase, timer = 1000) => {
  frase = frase.split(" ");
  let contador = 0;
  let length = frase.length;
  return new Promise((resolve) => {
    const intervalo = setInterval(() => {
      if (frase[contador]) {
        console.log(frase[contador]);
        contador++;
      } else {
        console.log(""); //saltode linea
        clearInterval(intervalo);
        resolve(length);
      }
    }, timer);
  });
};

const callbackFinal = (resultado) =>
  console.log(`Termino! El numero de palabras mostrado fue ${resultado}`);

const frasesEnConsola = async (frases, cb) => {
  let result = 0;
  if (Array.isArray(frases)) {
    for (let item of frases) {
      result += item.timer
        ? await mostrarFrase(item.frase, item.timer)
        : await mostrarFrase(item.frase);
    }
  } else {
    result = frases.timer
      ? await mostrarFrase(frases.frase, frases.timer)
      : await mostrarFrase(frases.frase);
  }

  cb(result);
};

frasesEnConsola(
  [
    { frase: "hola como estas?", timer: 50 },
    { frase: "enserio todo bien?" },
    { frase: "buenisimo nos vemos despues", timer: 250 },
  ],
  callbackFinal
);

// frasesEnConsola({ frase: "hola como estas?" }, callbackFinal); // para mandar 1 sola frase, puede ser con o sin timer
