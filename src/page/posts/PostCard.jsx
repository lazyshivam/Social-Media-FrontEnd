import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, MessageSquareMore } from "lucide-react"



export function PostCard(props) {
    const {title,content,image}=props.post
  return (
    <Card className="w-[350px]">
      <CardHeader>
              <CardTitle>{title }</CardTitle>
              <CardDescription>{content }</CardDescription>
      </CardHeader>
      <CardContent className="m-0 min-h-56 mb-4 pb-4 p-0">
       <img   src={image || 'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg'} alt="PostImage"  />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="p-2" variant="outline" ><Heart className='text-2xl'/></Button>
        <Button className="p-3"> <MessageSquareMore /></Button>
      </CardFooter>
    </Card>
  )
}
