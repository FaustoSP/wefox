export class PostType {
  id: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
  created_at: string;
  updated_at: string;

  constructor(
    id: number,
    title: string,
    content: string,
    lat: string,
    long: string,
    image_url: string,
    created_at: string,
    updated_at: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.lat = lat;
    this.long = long;
    this.image_url = image_url;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
