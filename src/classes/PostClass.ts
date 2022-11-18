// Class that represents a single Post.
// The id -1 is invalid, so that property must be set if the post is used as data for a PUT or DELETE request.
export class PostClass {
  id: number = -1;
  title: string = "";
  content: string = "";
  lat: string = "";
  long: string = "";
  image_url: string = "";
  created_at: string = "";
  updated_at: string = "";

  constructor(
    title: string,
    content: string,
    lat: string,
    long: string,
    image_url: string,
    created_at: string,
    updated_at: string
  ) {
    this.title = title;
    this.content = content;
    this.lat = lat;
    this.long = long;
    this.image_url = image_url;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
