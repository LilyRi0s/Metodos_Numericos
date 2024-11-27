    //guardar x en expr
function evaluateExpression(expr,xValue){
    return math.evaluate(expr,{x: xValue});
}

    //NR normal
function solucionNR(){
    const funcion = document.getElementById('nrfuncion').value;
    let x = parseFloat(document.getElementById('nrxi').value);
    const limite = parseFloat(document.getElementById('nrlimite').value);

    //tabla de res y limpiar
const tablares=document.querySelector('#ResultadosNR tbody');
tablares.innerHTML='';

    //derivar
    const derivada = math.derivative(funcion,'x').toString();

    let xderivada;
    let i = 0; //contador para las interaciones
    let error = Infinity;

    //Que el valor sea menor que el valor de error
    while(error > limite){
        const fx = evaluateExpression(funcion,x);//f(x) con x actual
        const dx = evaluateExpression(derivada,x);//f'(x) con x actual

        //Error
        if(i>0){
            error = Math.abs((x - xderivada)/x)*100;
        }
        else{
            error=Infinity;
        }

        //agregar los resultados obtenidos actuales
        tablares.innerHTML+=`
        <tr>
        <td>${i}</td>
        <td>${x.toFixed(6)}</td>
        <td>${error.toFixed(6)}%</td>
        </tr>
        `;

        //ahora si guardamos el valor de x actual para la prox interacion
        xderivada = x;
        x=x-(fx/dx);
        i++;
    }
}
// Evaluar expresión
function evaluateExpression(expr, xValue) {
    try {
        return math.evaluate(expr, { x: xValue });
    } catch (error) {
        alert("Error en la evaluación de la función. Verifique la sintaxis.");
        return null;
    }
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// Newton-Raphson Mejorado (NRM)
function solucionNRM() {
    const funcion = document.getElementById('nrmfuncion').value;
    let x = parseFloat(document.getElementById('nrmxi').value);
    const limite = parseFloat(document.getElementById('nrmlimite').value);

    const derivada = math.derivative(funcion, 'x').toString();
    const segundaderivada = math.derivative(derivada, 'x').toString();

    const tablares = document.querySelector('#nrmresultados tbody');
    tablares.innerHTML = '';


    let xPrevio;
    let i = 0;
    let error = Infinity;
    const maxIteraciones = 10; 
    const maxXValue = 1e6; 

    while (error > limite && i < maxIteraciones) {
        const fx = evaluateExpression(funcion, x);
        const dx = evaluateExpression(derivada, x);
        const ddx = evaluateExpression(segundaderivada, x);

        

        if (i > 0) {
            error = Math.abs((x - xPrevio) / x) * 100;
        } else {
            error = Infinity;
        }

        // Mostrar resultados en la tabla
        tablares.innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${x.toFixed(6)}</td>
                <td>${error.toFixed(6)}%</td>
            </tr>
        `;


        if (Math.abs(dx) < 1e-6 || Math.abs(x) > maxXValue) {
            alert("El valor de x es demasiado grande o la derivada es cercana a cero. No se puede continuar.");
            break;
        }

        xPrevio = x;

        x = x - ((fx * dx) / (Math.pow(dx, 2) - fx * ddx));
        i++;
    }

    if (i === maxIteraciones) {
        alert("Se alcanzó el número máximo de iteraciones. Puede que el límite sea demasiado bajo o la función no converja.");
    }
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function calcularErrores() {
    const valorVerdadero = parseFloat(document.getElementById('valorVerdadero').value);
    const valorAproximado = parseFloat(document.getElementById('valorAproximado').value);

    if (isNaN(valorVerdadero) || isNaN(valorAproximado)) {
        alert('Por favor ingresa valores válidos para el valor verdadero y el valor aproximado.');
        return;
    }

    const errorAbsoluto = Math.abs(valorVerdadero - valorAproximado);

    const errorRelativo = errorAbsoluto / Math.abs(valorVerdadero);

    const errorRelativoPorcentual = errorRelativo * 100;

    document.getElementById('errorAbsoluto').textContent = errorAbsoluto.toFixed(4);
    document.getElementById('errorRelativo').textContent = errorRelativo.toFixed(4);
    document.getElementById('errorRelativoPorcentual').textContent = errorRelativoPorcentual.toFixed(2) + '%';
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





function calcularMc() {
    const valorX = parseFloat(document.getElementById('valorX').value);
    const numeroIteraciones = parseInt(document.getElementById('numeroIteraciones').value);
    
    const valorVerdadero = Math.exp(valorX);
    

    let resultadosHTML = '';
    let valorAprox = 1; 
    let errorAbsoluto, errorRelativo;
    let valorAproxAnterior = 1; 
    
    for (let i = 0; i < numeroIteraciones; i++) {
        if (i > 0) {
            valorAprox += Math.pow(valorX, i) / factorial(i);
        }

        // despues de la primera int 
        if (i > 0) {  
            errorAbsoluto = Math.abs((valorAprox - valorAproxAnterior) / valorAprox) * 100;
        } else {
            errorAbsoluto = 0;  
        }

        errorRelativo = (Math.abs(valorVerdadero - valorAprox) / valorVerdadero) * 100;

        resultadosHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${valorAprox.toFixed(6)}</td>
                <td>${errorRelativo.toFixed(6)}%</td>
                <td>${errorAbsoluto.toFixed(6)}</td>
            </tr>
        `;

        valorAproxAnterior = valorAprox;
    }

    document.getElementById('resultados').innerHTML = resultadosHTML;
}

function factorial(n) {
    let resultado = 1;
    for (let i = 1; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





let intervalos = []; 
let intervaloCount = 0; 


function generarTabla() {
    const numIntervalos = parseInt(document.getElementById('intervalos').value);

    if (isNaN(numIntervalos) || numIntervalos < 1) {
        alert('Por favor, ingresa un número válido de intervalos.');
        return;
    }

    let tablaHTML = '<table><tr><th>Valor de X</th><th>Valor de Y</th></tr>';
    for (let i = 0; i < numIntervalos; i++) {
        tablaHTML += `
            <tr>
                <td><input type="number" id="x${i}" placeholder="Valor de X" required></td>
                <td><input type="number" id="y${i}" placeholder="Valor de Y" required></td>
            </tr>
        `;
    }
    tablaHTML += '</table>';

    document.getElementById('tabla-container').innerHTML = tablaHTML;

    document.getElementById('form-x-para-calcular').style.display = 'block';
}

function calcularValorY() {
    const xValor = parseFloat(document.getElementById('x-valor').value);
    
    

    intervalos = [];
    intervaloCount = parseInt(document.getElementById('intervalos').value);
    for (let i = 0; i < intervaloCount; i++) {
        const x = parseFloat(document.getElementById(`x${i}`).value);
        const y = parseFloat(document.getElementById(`y${i}`).value);

        if (!isNaN(x) && !isNaN(y)) {
            intervalos.push({ x, y });
        }
    }


    //interpo
    let yInterpolado = 0;
    for (let i = 0; i < intervaloCount - 1; i++) {
        const x0 = intervalos[i].x;
        const y0 = intervalos[i].y;
        const x1 = intervalos[i + 1].x;
        const y1 = intervalos[i + 1].y;

        // Comprobar si x está en el rango entre x0 y x1
        if (xValor >= x0 && xValor <= x1) {
            yInterpolado = y0 + (xValor - x0) * (y1 - y0) / (x1 - x0);
            break;
        }
    }

    document.getElementById('valorY').textContent = yInterpolado.toFixed(6);
    document.getElementById('resultado-y').style.display = 'block';
}






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






function calcularBiseccion(){

    const funcionInput = document.getElementById("funcion").value;
    const errorInput = parseFloat(document.getElementById("error").value);
    const xiInput = parseFloat(document.getElementById("xi").value);
    const xsInput = parseFloat(document.getElementById("xs").value);

    if (!funcionInput || isNaN(errorInput) || isNaN(xiInput) || isNaN(xsInput)) {
        alert("Completa todos los campos correctamente.");
        return;
    }

    let xi = xiInput;
    let xs = xsInput;
    let error = Infinity;
    let iteracion = 0;

    const tablaResultadosbi = document.getElementById("tablaResultadosbi");
    tablaResultadosbi.querySelector("tbody")?.remove();
    const tbody = document.createElement("tbody");

    while (error > errorInput) {
        const xr = (xi + xs) / 2;
        const fXi = evaluateExpression(funcionInput, xi);
        const fXr = evaluateExpression(funcionInput, xr);
        const producto = fXi * fXr;

        if (iteracion > 0) {
            error = Math.abs((xr - xi) / xr) * 100;
        }

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${iteracion}</td>
            <td>${xi.toFixed(6)}</td>
            <td>${xs.toFixed(6)}</td>
            <td>${xr.toFixed(6)}</td>
            <td>${fXi.toFixed(6)}</td>
            <td>${fXr.toFixed(6)}</td>
            <td>${producto.toFixed(6)}</td>
            <td>${iteracion === 0 ? "-" : error.toFixed(6)}%</td>
        `;
        tbody.appendChild(fila);

        if (producto < 0) {
            xs = xr;
        } else {
            xi = xr;
        }

        iteracion++;
        if (iteracion > 100) {
            alert("El método no converge.");
            break;
        }
    }

    tablaResultadosbi.appendChild(tbody);
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






function calcularSecante() {
    try {
        const tablaResultadossec = document.getElementById("tablaResultadossec");
        tablaResultadossec.querySelector("tbody")?.remove(); 
        const tbody = document.createElement("tbody"); 

        const funcionStr = document.getElementById("funcion").value; 
        const errorDeseado = parseFloat(document.getElementById("tol").value); 
        let ximen1 = parseFloat(document.getElementById("x0").value); 
        let xi = parseFloat(document.getElementById("x1").value); 

        const f = math.parse(funcionStr).compile();

        let errorActual = 100; 
        let iteracion = 0;

        while (errorActual > errorDeseado) {
            iteracion++;

            const fximen1 = f.evaluate({ x: ximen1 });
            const fxi = f.evaluate({ x: xi });

            const ximas1 = xi - (fxi * (xi - ximen1)) / (fxi - fximen1);

            errorActual = Math.abs((ximas1 - xi) / ximas1) * 100;

            const fximas1 = f.evaluate({ x: ximas1 });

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${iteracion}</td>
                <td>${ximen1.toFixed(5)}</td>
                <td>${xi.toFixed(5)}</td>
                <td>${ximas1.toFixed(5)}</td>
                <td>${fximen1.toFixed(5)}</td>
                <td>${fxi.toFixed(5)}</td>
                <td>${fximas1.toFixed(5)}</td>
                <td>${errorActual.toFixed(5)}</td>
            `;
            tbody.appendChild(fila);

            ximen1 = xi;
            xi = ximas1;
        }

        tablaResultadossec.appendChild(tbody);
    } catch (error) {
        if (error instanceof SyntaxError) {
            alert("Error de sintaxis en la función ingresada. Verifica que esté correctamente escrita.");
        } else if (error.message.includes("division by zero")) {
            alert("División por cero en la evaluación. Ajusta los valores iniciales.");
        } else {
            alert(`Error inesperado: ${error.message}`);
        }
    }
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






function calcularErroresTaylor() {
    try {
        const tablaResultados = document.getElementById("tablaResultados");
        tablaResultados.innerHTML = `
            <thead>
                <tr>
                    <th>Iteración</th>
                    <th>Valor Aproximado</th>
                    <th>Error Truncado</th>
                </tr>
            </thead>
        `;

        const funcion = document.getElementById("funcion").value.trim(); 
        const xi = parseFloat(document.getElementById("xi").value); 
        const xi1 = parseFloat(document.getElementById("xi1").value); 
        const h = parseFloat(document.getElementById("h").value); 
        const numTerminos = parseInt(document.getElementById("numTerminos").value); 

        if (isNaN(xi) || isNaN(xi1) || isNaN(h) || isNaN(numTerminos) || funcion === "") {
            alert("Por favor, ingresa valores válidos.");
            return;
        }

        const math = window.math;
        const expr = math.parse(funcion);

        const valorVerdadero = expr.evaluate({ x: xi1 });

        let resultadoActual = 0; 

        for (let n = 0; n < numTerminos; n++) {
            const derivada = math.derivative(expr, "x", { simplify: true });
            let derivadaN = expr;
            for (let i = 0; i < n; i++) {
                derivadaN = math.derivative(derivadaN, "x");
            }

            const derivadaEnXi = derivadaN.evaluate({ x: xi });

            const termino = (derivadaEnXi / factorial(n)) * Math.pow(h, n);

            resultadoActual += termino;

            const errorTruncado = valorVerdadero - resultadoActual;

            const nuevaFila = `
                <tr>
                    <td>${n}</td>
                    <td>${resultadoActual.toFixed(6)}</td>
                    <td>${errorTruncado.toFixed(6)}</td>
                </tr>
            `;
            tablaResultados.innerHTML += nuevaFila;
        }
    } catch (error) {
        alert("Error: Verifica la sintaxis de la función o los valores ingresados.");
        console.error(error);
    }
}

