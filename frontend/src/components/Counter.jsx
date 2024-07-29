import { FaCirclePlus } from "react-icons/fa6";
import { AiFillMinusCircle } from "react-icons/ai";

export default function Counter({ incrementQuantidade, decrementQuantidade, getQuantidadeById, id }) {
    const quantidade = getQuantidadeById(id);

    return (
        <div className="flex space-x-2 text-lg max-w-28">
            <button onClick={() => incrementQuantidade(id)}>
                <FaCirclePlus className="text-2xl text-indigo-700" />
            </button>
            <input
                type="text"
                className="w-10 border text-center text-gray-700"
                value={quantidade}
                readOnly
            />
            <button onClick={() => decrementQuantidade(id)}>
                <AiFillMinusCircle className="text-3xl text-indigo-700" />
            </button>
        </div>
    );
}
