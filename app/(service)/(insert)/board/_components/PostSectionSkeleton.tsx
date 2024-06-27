// "use client";

// import { useSession } from "next-auth/react";
// import React from "react";

// export default function PostSectionSkeleton() {
//     const { data: session } = useSession();
//     return (
//         <div className="container mx-auto max-w-3xl p-4 text-white">
//             <div className="grid grid-cols-12 gap-4 rounded-[10px] bg-card p-4 text-sm">
//                 <div className="col-span-1">#</div>
//                 <div className="col-span-4">제목</div>
//                 <div className="col-span-2">글쓴이</div>
//                 <div className="col-span-3">날짜</div>
//                 <div className="col-span-1">조회수</div>
//                 <div className="col-span-1">추천</div>
//             </div>
//             <div className="mt-2 grid grid-cols-1 gap-2 text-sm"></div>
//             <div className="mb-4 mt-2 flex justify-end">
//                 {session ? (
//                     <div
//                         href="/board/write"
//                         className="rounded-md border bg-gray-700 px-2 py-1 text-white"
//                     >
//                         글쓰기
//                     </div>
//                 ) : null}
//             </div>

//             <Pagination
//                 currentPage={page}
//                 totalPages={totalPages}
//                 onPageChange={pageChangeHandler}
//             />
//         </div>
//     );
// }
