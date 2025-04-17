import GridLayout from "./GridLayout";


const App = () => {


  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <link rel="stylesheet" href="css/styles.css" />
          <link rel="icon" type="image/png" href="/favicon.ico" />
          <title>Persona Manager</title>
        </head>
        <body className="bg-gradient-to-b from-[#5d83aa] to-[#080a42] text-gray-900">
          {/* Navbar */}
          <header className="fixed top-0 left-0 w-full h-12 bg-[#1f3855] text-white flex items-center justify-center shadow-md">
            <p className="text-lg font-semibold">Persona Manager</p>
          </header>

          <GridLayout/>

          <script src="js/main.js"></script>
        </body>
      </html>
    </>
  );
};

export default App;
