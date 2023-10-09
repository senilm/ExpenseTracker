

const ButtonLink = ({label}) => {
  
  return (
    <button className="px-3 py-2 border shadow-sm rounded-md border-black active:bg-white-400 hover:bg-transparent  transition-all">
        <div className="hover:scale-110 transition-all">
          {label}
          </div>
    </button>
  )
}

export default ButtonLink