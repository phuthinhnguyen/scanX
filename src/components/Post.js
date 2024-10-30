import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    hidden: { opacity: 0, scale: 0 },

}
const Post = ({ item }) => {
    const control = useAnimation()
    // const [ref, inView] = useInView({ once: true })
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    useEffect(() => {
        if (isInView) {
            control.start("visible");
        }
        else {
            control.start("hidden");
        } 
    }, [isInView]);
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={control}
            className="box"
            variants={boxVariant}>
            {item}
        </motion.div>
        // <div>{item}</div>
    );
};
export default Post;