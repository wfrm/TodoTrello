interface Props{
sumador:()=>void;
}

function Sumador(props:Props) {
  const {sumador}=props;
  return (
    <button onClick={sumador}>
      sumar
    </button>
  )
}

export default Sumador
