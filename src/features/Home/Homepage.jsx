import React, { useState } from "react"
import ProductCard from "../../components/ProductCard"
import { Link } from "react-router-dom"
import { AiOutlineCaretDown } from "react-icons/ai"
import { IoLocationSharp } from "react-icons/io5"
import LoginForm from "../Auth/LoginForm"

const Homepage = () => {
    const findNewBar = (
        <div className="desktop:w-desktop my-6 mx-auto bg-white rounded-t-xl p-3 flex items-center justify-between ">
            <div className="flex items-center gap-4">
                <div>Sắp xếp theo</div>
                <div className="rounded-[10px] p-3 text-gray-800 font-medium bg-gray-300">
                    <Link to="" className="text-primary">
                        BÀI MỚI
                    </Link>
                </div>
                <div className="rounded-[10px] p-3 text-gray-800 font-medium bg-gray-300">
                    <Link to="" className="active:text-primary">
                        SẢN PHẨM YÊU THÍCH
                    </Link>
                </div>
            </div>
            <div className="bg-gray-300 rounded p-3 flex items-center">
                <span>
                    <IoLocationSharp className="text-primary scale-1.75 mr-2" />
                </span>
                <span className="hover:underline hover:text-primary cursor-pointer">
                    Chọn khu vực
                </span>
                <span>
                    <AiOutlineCaretDown className="text-primary ml-2" />
                </span>
            </div>
        </div>
    )

    return (
        <div className="py-3 mx-auto bg-gray-300">
            {findNewBar}
            <div className="desktop:w-desktop m-auto ">
                <div className="grid grid-cols-5 gap-2">
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                    <ProductCard imageUrl={"../../1228831.jpg"} />
                </div>
            </div>
        </div>
    )
}

export default Homepage
