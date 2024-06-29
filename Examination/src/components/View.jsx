import React from 'react'

function View() {
  
  return (
    <div className="App container mx-auto p-4">

    <div className="uploaded mt-8">
      <h4 className="text-xl font-bold mb-4">Uploaded PDF:</h4>
      <div className="output-div grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <div className="inner-div p-4 bg-white shadow-md rounded">
                  <h6 className="text-lg font-semibold mb-2">Title: </h6>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                    Show Pdf
                  </button>
                </div>
      </div>
    </div>

  </div>
  )
}

export default View


