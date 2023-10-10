import { ThreeCircles } from 'react-loader-spinner'

const Loader = () => {
    return (
       <div className=' h-[100vh] flex justify-center items-center translate-y-[-40%] '>
         <ThreeCircles
            height="50"
            width="50"
            color="gray"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
        />
       </div>
    )
}

export default Loader