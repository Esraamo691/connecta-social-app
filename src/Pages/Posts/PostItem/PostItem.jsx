import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
export default function PostItem({ post }) {
  const {
    body,
    image,
    createdAt,
    user: { _id, name, photo },
    comments,
  } = post;
  return (
    <Card className="py-4 max-w-3xl bg-gray-800">
      <CardHeader className="pb-0 pt-2 px-4 flex items-center">
        <Avatar
          isBordered
          as="button"
          className="transition-transform me-4"
          color="secondary"
          size="sm"
          src={photo}
        />
        <div className="">
          <h2 className="text-tiny mb-1 uppercase font-bold">{name}</h2>
          <span>{createdAt}</span>
        </div>
      </CardHeader>
      <CardBody className="  py-2">
        <h3 className="mb-2">{body}</h3>
        <img alt={body} className="object-cover rounded-xl" src={image} />
      </CardBody>
      <CardFooter>
        <h1>footer</h1>
      </CardFooter>
    </Card>
  );
}
