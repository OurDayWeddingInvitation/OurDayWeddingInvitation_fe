import { getImagePath } from "@/app/lib/utils/functions";
import { useMainImageStore } from "@/app/store/useMainImageStore";

const Mainstyle1 = ({ wedding }) => {
  const { mainImageInfo } = useMainImageStore();

  const year = wedding.weddingYear;
  const month = wedding.weddingMonth;
  const day = wedding.weddingDay;
  const groomName = wedding.groomLastName + wedding.groomFirstName;
  const brideName = wedding.brideLastName + wedding.brideFirstName;
  const timeOfDay = wedding.weddingTimePeriod;
  const hour = wedding.weddingHour;
  const min = wedding.weddingMinute;
  const hallDetail = wedding.weddingHallFloor;
  const hallName = wedding.weddingHallName;

  return (
    <div className="bg-[#FFFFFF] px-[22px] py-[60px] text-[#5E5852]" style={{ fontFamily: "NanumMyeongjo" }}>
      <div className="text-center text-[24px] font-extrabold">
        <span>
          {year} / {month} / {day}
        </span>
        <div className="text-[14px] font-bold tracking-[2.8px]">SATURDAY</div>
        {mainImageInfo ? (
          <img src={getImagePath(mainImageInfo.originalUrl)} alt="메인 이미지2" className="py-[22px] h-[760px] object-cover" />
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
