    //guardar x en expr
function evaluateExpression(expr,xValue){
    return math.evaluate(expr,{x: xValue});
}

    //NR normal
function solucionNR(){
    const funcion = document.getElementById('nrfuncion').value;
    let x = parseFloat(document.getElementById('nrxi').value);
    const limite = parseFloat(document.getElementById('nrlimite').value)/100;

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
    const maxIteraciones = 10; // Número máximo de iteraciones
    const maxXValue = 1e6; // Máximo valor permitido para x

    while (error > limite && i < maxIteraciones) {
        const fx = evaluateExpression(funcion, x);
        const dx = evaluateExpression(derivada, x);
        const ddx = evaluateExpression(segundaderivada, x);

        // Verificar si fx, dx o ddx son válidos
        if (fx === null || dx === null || ddx === null) {
            alert("Error en el cálculo de la función o sus derivadas. Verifique la entrada.");
            break;
        }

        // Calcular el error solo después de la primera iteración
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


        // Verificar si la derivada es muy pequeña o si x es demasiado grande
        if (Math.abs(dx) < 1e-6 || Math.abs(x) > maxXValue) {
            alert("El valor de x es demasiado grande o la derivada es cercana a cero. No se puede continuar.");
            break;
        }

        // Guardar el valor anterior de x
        xPrevio = x;

        // Calcular nuevo valor de x usando la fórmula modificada
        x = x - ((fx * dx) / (Math.pow(dx, 2) - fx * ddx));
        i++;
    }

    // Verificar si se alcanzó el número máximo de iteraciones
    if (i === maxIteraciones) {
        alert("Se alcanzó el número máximo de iteraciones. Puede que el límite sea demasiado bajo o la función no converja.");
    }
}
