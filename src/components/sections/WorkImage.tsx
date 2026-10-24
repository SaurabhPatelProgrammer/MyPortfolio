import { MdArrowOutward } from "react-icons/md";
interface Props { image: string; alt?: string; link?: string; }
const WorkImage = ({ image, alt, link }: Props) => (
  <div className="work-image">{link ? <a className="work-image-in" href={link} target="_blank" rel="noopener noreferrer" data-cursor="disable"><div className="work-link"><MdArrowOutward /></div><img src={image} alt={alt} loading="lazy" /></a> : <div className="work-image-in"><img src={image} alt={alt} loading="lazy" /></div>}</div>
);
export default WorkImage;
