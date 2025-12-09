import { getImagePath } from "@/app/lib/utils/functions";
import { useMainImageStore } from "@/app/store/useMainImageStore";

const Mainstyle1 = ({ wedding }) => {
  const { mainImageInfo } = useMainImageStore();

  const year = wedding.date.year;
  const month = wedding.date.month;
  const day = wedding.date.day;
  const groomName = wedding.groom.lastName + wedding.groom.firstName;
  const brideName = wedding.bride.lastName + wedding.bride.firstName;
  const timeOfDay = wedding.time.timeOfDay;
  const hour = wedding.time.hour;
  const min = wedding.time.min;
  const hallDetail = wedding.hallDetail;
  const hallName = wedding.hallName;

  return (
    <div
      className="bg-[#FFFFFF] px-[22px] py-[60px] text-[#5E5852]"
      style={{ fontFamily: "NanumMyeongjo" }}
    >
      <div className="text-center text-[24px] font-extrabold">
        <span>
          {year} / {month} / {day}
        </span>
        <div className="text-[14px] font-bold tracking-[2.8px]">SATURDAY</div>
        {mainImageInfo ? (
          <img
            src={getImagePath(mainImageInfo.originalUrl)}
            alt="메인 이미지2"
            className="py-[22px] h-[760px] object-cover"
          />
        ) : (
          <div className="bg-[#D9D9D9] h-[760px]"></div>
        )}
      </div>
      <div className="text-center">
        <div className="text-[20px] font-extrabold pb-[30px]">
          {groomName} • {brideName}
        </div>
        <p>
          {year}년 {month}월 {day}일 토요일 {timeOfDay} {hour} {min}
        </p>
        <p>
          {hallDetail}, {hallName}
        </p>
      </div>
    </div>
  );
};

export default Mainstyle1;
