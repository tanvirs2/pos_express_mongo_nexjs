import Link from "next/link";
import {Card} from "react-bootstrap";

export default function BigMenu(props) {
    return (
        <Link href={props.compData.link}>
            <a className="text-decoration-none text-center text-black">
                <Card className="py-5 shadow-lg h-100">
                    <Card.Body>
                        <h1>{props.compData.name}</h1>
                        <Card.Title>module</Card.Title>
                        Grouparoo is open source and free to run in on your own cloud.
                        <br />
                        <br />
                        <p>
                            Gazi Traders
                        </p>
                    </Card.Body>
                </Card>
            </a>
        </Link>
    );
}
