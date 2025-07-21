 import Loading from './Loading'

 const ImagePreview = (props) => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
           {/* Origanal Image  */}
           <div className="bg-white shadow-lg rounded-xl overflow-hidden">
             <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2" >
                Origanal Image
             </h2>

             {props.uploaded ? <img
             src={props.uploaded}
             className="w-full h-full object-cover"
             /> : <div className="flex items-center justify-center h-80 bg-gray-200" > 
                No Image selected 
             </div>
            }
             <img src={props.uploaded} alt="" className="w-full h-full object-cover" />
             

            </div>

             {/* Enhanced Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
             <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-2" >
                Enhanced Image
             </h2>

             {props.enhanced && !props.loading && ( <img src="" alt="" className="w-full h-full object-cover" />  )}

             {props.loading ? <Loading/> : <div className="flex items-center justify-center h-80 bg-gray-200" > 
                no Enhanced Image 
             </div> }

            
            
           
            </div>
        </div>
    )

 }

 export default ImagePreview ;

