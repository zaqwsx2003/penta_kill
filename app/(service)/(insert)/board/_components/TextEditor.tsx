// import dynamic from "next/dynamic";
// import "quill/dist/quill.snow.css"; // Quill의 기본 스타일시트를 가져옵니다.
// import { useRef, useEffect } from "react";

// const QuillNoSSRWrapper = dynamic(
//     async () => {
//         const { default: QuillComponent } = await import("react-quill");
//         const { default: ImageCompress } = await import("quill-image-compress");
//         const { default: ImageDrop } = await import("quill-image-drop-module");
//         const { default: ImageResize } = await import(
//             "quill-image-resize-module"
//         );

//         // Quill에 모듈 등록
//         QuillComponent.Quill.register("modules/imageCompress", ImageCompress);
//         QuillComponent.Quill.register("modules/imageDrop", ImageDrop);
//         QuillComponent.Quill.register("modules/imageResize", ImageResize);

//         // Quill 컴포넌트를 생성하여 반환
//         const Quill = ({ forwardedRef, ...props }) => (
//             <QuillComponent ref={forwardedRef} {...props} />
//         );

//         return Quill;
//     },
//     { loading: () => <div>...loading</div>, ssr: false },
// );

// const QuillEditor = () => {
//     const quillRef = useRef(null);

//     useEffect(() => {
//         if (quillRef.current) {
//             console.log("Quill Editor loaded:", quillRef.current);
//         }
//     }, []);

//     return (
//         <QuillNoSSRWrapper
//             forwardedRef={quillRef}
//             modules={{
//                 toolbar: [
//                     [{ header: [1, 2, false] }],
//                     ["bold", "italic", "underline"],
//                     ["image", "code-block"],
//                 ],
//                 imageCompress: {
//                     quality: 0.7,
//                     maxWidth: 1000,
//                     maxHeight: 1000,
//                     imageType: "image/jpeg",
//                     debug: true,
//                 },
//                 imageDrop: true,
//                 imageResize: {
//                     modules: ["Resize", "DisplaySize", "Toolbar"],
//                 },
//             }}
//             theme="snow"
//         />
//     );
// };

// export default QuillEditor;
