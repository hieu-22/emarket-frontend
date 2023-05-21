import "./slider.css"

import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Breadcrumb from "../../components/Breadcrumb"
import Slider from "react-slick"
import numeral from "numeral"
// react-ioncs
import {
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowLeft,
} from "react-icons/md"
import { SlLocationPin } from "react-icons/sl"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { BsFillTelephoneForwardFill } from "react-icons/bs"
import { BiShareAlt } from "react-icons/bi"
import { TbMessageCircle2Filled } from "react-icons/tb"
import { FaUserCircle } from "react-icons/fa"

// redux
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../Auth/authSlice"
import {
    selectPost,
    selectPostImagesUrls,
    selectPostError,
    selectPostStatus,
    getPostByUrlThunk,
    resetPostStatus,
} from "../Post/postSlice"
import {
    getUserByIdThunk,
    selectUserError,
    selectUserStatus,
    resetUserStatus,
} from "../User/userSlice"

const SinglePostPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const user = useSelector(selectUser)
    const post = useSelector(selectPost)
    const author = post?.author
    const postImagesUrls = useSelector(selectPostImagesUrls)
    const postStatus = useSelector(selectPostError)
    const postError = useSelector(selectPostError)

    const [showAuthorPhoneNumber, setShowAuthorPhoneNumber] = useState(false)
    const [authorFieldFixed, setAuthorFieldFixed] = useState(false)

    useEffect(() => {
        ;(async () => {
            const { postUrl } = params
            const result = await dispatch(
                getPostByUrlThunk({ postUrl })
            ).unwrap()
            console.log(">>> At useEffect, post: ", result)
        })()
    }, [])
    // create a function to listen changes of status and error of that request (redux state), alert status and error to user in a friendly way
    useEffect(() => {
        if (postStatus === "failed" && postError?.code) {
            alert(
                `Error: ${postError.code}\nStatusCode:${postError.statusCode}\nStatusText:  ${postError.statusText}`
            )
        }
    }, [postStatus, postError])

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.pageYOffset
            if (scrollPosition >= 215) {
                setAuthorFieldFixed(true)
            } else {
                setAuthorFieldFixed(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    // Customize slider
    const [activeIndex, setActiveIndex] = useState(0)
    const sliderSettings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: (
            <MdOutlineKeyboardArrowRight
                className="slick-next"
                fill="rgba(0,0,0,0.5)"
            />
        ),
        prevArrow: (
            <MdOutlineKeyboardArrowLeft
                className="slick-prev"
                fill="rgba(0,0,0,0.5)"
            />
        ),
        customPaging: (i) => {
            return (
                <div
                    className={` w-[10px] h-[10px] rounded-[50%] bg-gray-200 -translate-y-16 ${
                        activeIndex === i ? "bg-primary" : ""
                    }`}
                ></div>
            )
        },
        beforeChange: function (current, next) {
            setActiveIndex(next)
        },
    }

    const handleShareUrl = () => {
        // Get the current URL
        const url = window.location.href

        // Copy the URL to the clipboard
        navigator.clipboard.writeText(url)

        // Notify the user that the URL has been copied
        alert("Đã copy Link")
    }

    const handleLookPoster = async () => {
        const userId = post?.user_id
        navigate(`/user/${userId}`)
    }

    const quickQuestionList = [
        "Bạn còn sản phẩm này không?",
        "Bạn có ship hàng không?",
        "Sản phẩm còn bảo hành không không?",
        "Sản phẩm còn bảo hành không không?",
    ]

    const ProductImageSlider = (
        <Slider {...sliderSettings}>
            {postImagesUrls
                ? postImagesUrls.map((url) => {
                      return (
                          <div className="w-full h-[460px]">
                              <img
                                  src={url}
                                  alt=""
                                  className="object-cover w-full h-full "
                              />
                          </div>
                      )
                  })
                : ""}
        </Slider>
    )

    const PostField = (
        <div className="bg-white">
            {/* product images */}
            <div className="w-full h-[460px] relative">
                {ProductImageSlider}
                <div className="absolute bottom-0 w-full z-10 flex justify-end py-1 pr-2 bg-black-0.5">
                    <p className="text-white">
                        Tin đăng {post?.timeAgo ? post.timeAgo : "...loading"}{" "}
                        trước
                    </p>
                </div>
            </div>

            {/* product information */}
            <div className="pt-6 pb-3">
                <h1 className="text-xl font-semibold">
                    {post?.title ? post?.title : ""}
                </h1>
            </div>

            {/* price and like post  */}
            <div className="pb-3 flex justify-between items-center text-red-500 font-medium">
                <div className="text-xl">
                    <p>
                        {post?.price
                            ? numeral(post.price)
                                  .format("0,0 ₫")
                                  .replaceAll(",", ".")
                            : "...loading"}
                        &nbsp;đ
                    </p>
                </div>
                <div className="border border-red-500 rounded-[20px] flex items-center py-1 px-2">
                    <span>Lưu tin</span>
                    <span className="pl-2">
                        {true ? <AiFillHeart /> : <AiOutlineHeart />}
                    </span>
                </div>
            </div>

            {/* description */}
            <div className="pb-3">
                <div className="text-lg font-semibold text-gray-500">Mô Tả</div>
                <p className="w-full whitespace-normal break-words">
                    {post?.description ? post.description : "...loading"}
                </p>
            </div>

            {/* phone Number, true to hide phoneNumber, false to show phoneNumber */}
            <div>
                <div className="text-lg font-semibold text-gray-500">
                    Liên hệ
                </div>
                <p
                    className={
                        `text-blue-400 underline cursor-pointer ` +
                        (showAuthorPhoneNumber
                            ? "no-underline !text-black"
                            : "")
                    }
                >
                    {showAuthorPhoneNumber
                        ? "Số điện thoại: "
                        : "Nhấn để hiện số: "}

                    <span
                        className={"font-bold hover:underline"}
                        onClick={() => {
                            if (!showAuthorPhoneNumber)
                                return setShowAuthorPhoneNumber(true)

                            navigator.clipboard.writeText(author?.phoneNumber)
                            alert("Đã copy số điện thoại")
                        }}
                    >
                        {author?.phoneNumber
                            ? showAuthorPhoneNumber
                                ? author.phoneNumber
                                : author?.phoneNumber.slice(0, -5) + "*****"
                            : "...loading"}
                    </span>
                </p>
            </div>

            {/* Areas  */}
            <div className="pb-3">
                <div className="py-2 border-b border-gray-200 text-gray-500 text-lg font-medium">
                    Địa chỉ
                </div>
                <div className="flex items-center justify-start gap-1 py-1">
                    <div>
                        <SlLocationPin className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="font-medium text-gray-700">
                        {post?.address ? post.address : "---"}
                    </div>
                </div>
            </div>
            {/* Quick Chat  */}
            {/* <div className="pb-3">
                <div className="pb-2 border-b border-gray-200 text-gray-500 text-lg font-medium">
                    Hỏi người bán qua chat
                </div>
                <div className="w-full overflow-x-scroll flex gap-6 py-3">
                    {quickQuestionList.map((question) => {
                        return (
                            <div className="flex-shrink-0 py-1 px-2 border border-primary rounded-[20px] cursor-pointer hover:bg-gray-100">
                                {question}
                            </div>
                        )
                    })}
                </div>
            </div> */}

            {/* share post */}
            <div className="pb-3">
                <div className="pb-2 border-b border-gray-200 text-gray-500 text-lg font-medium">
                    Chia sẻ tin đăng này cho bạn bè
                </div>
                <div className="py-2">
                    <div
                        className="w-10 h-10 rounded-[50%] bg-light-primary flex items-center justify-center hover:bg-primary cursor-pointer"
                        onClick={(event) => {
                            console.log("Click event:", event.target)
                            handleShareUrl()
                        }}
                    >
                        <BiShareAlt className="text-white w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
    )

    const AuthorFiled = (
        <div
            className={
                (authorFieldFixed ? " fixed top-0 w-[376px] " : " relative ") +
                `border-t border-t-gray-200 py-2`
            }
        >
            <div
                className="flex gap-x-3 justify-between cursor-pointer"
                onClick={handleLookPoster}
            >
                <div className="w-14 h-14 rounded-[50%] p-[1px] border border-primary">
                    {author?.avatar ? (
                        <img
                            src={author.avatar}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-[50%]"
                        />
                    ) : (
                        <>
                            <FaUserCircle className="w-full h-full text-gray-400 rounded-[50%]"></FaUserCircle>
                        </>
                    )}
                </div>
                <div className="flex flex-col justify-between ml-[-12px]">
                    <div className="text-lg text-blue-800 font-medium hover:text-gray-700 hover:underline ">
                        {author?.userName ? author.userName : ""}
                    </div>
                    <div className="flex items-center gap-x-2 w-[140px] mb-2">
                        <div
                            className={
                                `w-2 h-2 rounded-[50%] ` +
                                (author?.isOnline
                                    ? "bg-green-600"
                                    : "bg-gray-600")
                            }
                        ></div>
                        <div
                            className={
                                "text-xs font-medium " +
                                (author?.isOnline
                                    ? "text-green-700"
                                    : "text-gray-600")
                            }
                        >
                            {author?.isOnline
                                ? "Đang hoạt động"
                                : "Không hoạt động"}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="px-3 py-2 mt-2 text-white bg-primary rounded-[20px] hover:bg-light-primary text-sm font-medium">
                        Xem người đăng
                    </div>
                </div>
            </div>
            <div className="my-2 py-2 border-t border-b border-gray-200">
                <div className="text-gray-400 text-base font-semibold">
                    Đánh giá:{" "}
                    <span className="px-2"> {true ? "---" : "starts"}</span>
                </div>
            </div>
            <div>
                <div
                    className={
                        " my-2 flex items-end" +
                        (author?.phoneNumber && showAuthorPhoneNumber
                            ? " justify-around "
                            : " justify-between ") +
                        "border border-gray-300 rounded-md py-3 px-3 w-full text-lg cursor-pointer font-semibold text-gray-700 hover:bg-gray-200"
                    }
                    onClick={() => {
                        if (!showAuthorPhoneNumber)
                            return setShowAuthorPhoneNumber(true)

                        navigator.clipboard.writeText(author?.phoneNumber)
                        alert("Đã sao chép SĐT")
                    }}
                >
                    {author?.phoneNumber ? (
                        showAuthorPhoneNumber ? (
                            author.phoneNumber
                        ) : (
                            <>
                                <div className="flex">
                                    <div>
                                        <BsFillTelephoneForwardFill className="w-6 h-6 mt-[2px]" />
                                    </div>
                                    <div className="pl-4">
                                        {author?.phoneNumber.slice(0, -5) +
                                            "*****"}
                                    </div>
                                </div>

                                <div className="font-semibold ">
                                    Bấm để hiện số
                                </div>
                            </>
                        )
                    ) : (
                        "...loading"
                    )}

                    {}
                </div>
                <div className="my-2 flex items-end justify-between  rounded-md py-3 px-3 w-full text-lg cursor-pointer bg-light-primary text-white hover:opacity-80">
                    <div className="flex">
                        <div>
                            <TbMessageCircle2Filled className="w-7 h-7" />
                        </div>
                    </div>
                    <div className="font-semibold ">Chat với người bán</div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="bg-customWhite">
            <div className="laptop:w-laptop bg-white m-auto px-6">
                <Breadcrumb
                    title1={"Bài đăng"}
                    link1={"/posts"}
                    title2={post?.title ? post.title : "...loading"}
                ></Breadcrumb>
            </div>
            <div className="laptop:w-laptop m-auto bg-white flex">
                <div className="w-[600px] pl-6 pb-3">{PostField}</div>
                <div className="flex-1 px-6 pb-3">{AuthorFiled}</div>
            </div>
        </div>
    )
}

export default SinglePostPage
