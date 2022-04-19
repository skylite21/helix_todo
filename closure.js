// closure

const outer = () => {
  let counter = 0;

  // egy fgv, mindíg hozzáfér ahhoz a scope-hoz amiben létre lett hozva
  // akkor is amikor már lefutott
  // Persistent Lexical scope referenced data

  const incrementCounter = () => {
    counter++;
    console.log(counter);
    let counter2 = 0;
    const incrementCounter2 = () => {
      counter2++;
      console.log("counter2: ", counter2);
    };
    return incrementCounter2;
  };

  return incrementCounter();
};

const newFunction = outer();
newFunction();
newFunction();
newFunction();
newFunction();
newFunction();
