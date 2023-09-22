

const ButtonLink = ({label}) => {
  
  return (
    <button className="px-4 py-3 border rounded-[10px] border-black active:bg-white-400 hover:bg-white-400 transition-all">
        {label}
    </button>
  )
}

export default ButtonLink