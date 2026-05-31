// Import ảnh qua Vite để đảm bảo hoạt động cả dev lẫn production build
import banner1 from '../assets/images/story/banner_chuong1/banner.png';
import ch1_img1 from '../assets/images/story/ch1/chapter1.png';
import ch1_img2 from '../assets/images/story/ch1/chapter2.png';
import ch1_img3 from '../assets/images/story/ch1/chapter3.png';

export const storyData = {
  title: "Sử thi đồ long ký",
  chapters: [
    {
      id: 1,
      title: "Chương 1: Lời Nguyền Cổ Đại",
      banner: banner1,
      images: [ch1_img1, ch1_img2, ch1_img3],
      path: "/history/chapter/1",
      content: "Thuở hồng hoang, khi bầu trời còn ngập tràn những vì sao ma thuật, một lời nguyền bí ẩn được khắc sâu vào lòng đất. Những chiến binh đầu tiên bước vào thế giới T-beat không biết rằng mỗi bước chân của họ đang dần thức tỉnh một thế lực tối cổ đã ngủ yên ngàn năm..."
    },
    {
      id: 2,
      title: "Chương 2: Sự Trỗi Dậy Của Những Anh Hùng",
      banner: null,
      images: [],
      path: "/history/chapter/2",
      content: "Từ bốn phương trời, những anh hùng được số phận chọn lựa bắt đầu hội tụ. Mỗi người mang trong mình một mảnh của bí ẩn cổ đại — và chỉ khi họ đứng cạnh nhau, sức mạnh thực sự mới được giải phóng. Chương mới của lịch sử T-beat bắt đầu từ đây..."
    },
    {
      id: 3,
      title: "Chương 3: Cuộc Hành Trình Bắt Đầu",
      banner: null,
      images: [],
      path: "/history/chapter/3",
      content: "Con đường phía trước dài và đầy hiểm nguy. Những vùng đất chưa được khám phá, những quái vật mạnh mẽ hơn bao giờ hết và những bí mật được chôn vùi từ thời cổ đại đang chờ đợi. Hành trình thực sự của các anh hùng chính thức bắt đầu..."
    }
  ]
};
