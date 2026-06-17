import { RiArrowLeftLine } from "@remixicon/react";
import { Link } from "react-router";

interface Props {
    redirectPath: string
}

function BackButton({ redirectPath }: Props) {
    return (
        <Link to={redirectPath} title="Kembali" className={`w-fit flex flex-row items-center gap-x-2`}>
            <RiArrowLeftLine className={`size-5 text-black`}/>
            <span className={`text-md font-semibold text-black`}>Kembali</span>
        </Link>
    )
}

export default BackButton