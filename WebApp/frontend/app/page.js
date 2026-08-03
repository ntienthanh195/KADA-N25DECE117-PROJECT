import Link from "next/link";
import { PublicHeader, SiteFooter } from "@/components/chrome";
import Reveal from "@/components/reveal";
import { PromptChips } from "@/components/quick-diagnose";
import HeroInteractive from "@/components/hero-interactive";
import {
  IconFan, IconPot, IconKettle, IconFridge, IconWasher, IconStove,
  IconCamera, IconGauge, IconSteps, IconStop,
  IconBook, IconHistory, IconBolt, IconWrench, IconCheck, IconX,
} from "@/components/icons";

const SAMPLE_PROMPTS = [
  "Quạt kêu to bất thường khi chạy số 3",
  "Nồi cơm nhảy nút sớm, cơm còn sống",
  "Quạt có mùi khét nhẹ khi mới bật",
  "Nồi cơm không vào điện, đèn không sáng",
  "Quạt quay yếu hẳn dù để số lớn nhất",
];

export default function HomePage() {
  return (
    <>
      <PublicHeader variant="dark" />

      <div className="lp">
        {/* ===== Hero ===== */}
        <section className="lp-hero">
          <div className="container">
            <HeroInteractive />
          </div>
        </section>

        {/* ===== Dải thiết bị ===== */}
        <section className="section" style={{ paddingTop: 8 }}>
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="kicker">Thiết bị hỗ trợ</span>
                <h2>Từ những thiết bị quen thuộc nhất trong nhà</h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="device-strip">
                <div className="device-chip"><IconFan /> Quạt điện</div>
                <div className="device-chip"><IconPot /> Nồi cơm điện</div>
                <div className="device-chip"><IconKettle /> Ấm siêu tốc <span className="soon">Sắp có</span></div>
                <div className="device-chip"><IconFridge /> Tủ lạnh <span className="soon">Sắp có</span></div>
                <div className="device-chip"><IconWasher /> Máy giặt <span className="soon">Sắp có</span></div>
                <div className="device-chip"><IconStove /> Bếp từ <span className="soon">Sắp có</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Bento grid: cách hoạt động + tính năng ===== */}
        <section className="section" id="cach-hoat-dong">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="kicker">Cách hoạt động &amp; tính năng</span>
                <h2>Một luồng kiểm tra, mọi thứ có cấu trúc</h2>
                <p>
                  Không phải một đoạn AI trả lời dài — mỗi kết quả được chia thành
                  các khu vực rõ ràng, cảnh báo luôn đứng trước hướng dẫn.
                </p>
              </div>
            </Reveal>

            <div className="bento">
              <Reveal className="bento--wide bento--tall" delay={0}>
                <div className="bento-cell" style={{ height: "100%" }}>
                  <span className="icon-chip"><IconSteps /></span>
                  <h3>Ba bước từ sự cố đến quyết định đúng</h3>
                  <p>Từ lúc thiết bị gặp vấn đề đến khi bạn biết nên tự kiểm tra hay gọi kỹ thuật viên.</p>
                  <div className="bento-steps">
                    <div className="st"><b>1</b> Chọn loại thiết bị trong danh mục được hỗ trợ.</div>
                    <div className="st"><b>2</b> Mô tả triệu chứng bằng lời của bạn, đính kèm 1–3 ảnh.</div>
                    <div className="st"><b>3</b> Nhận kết quả theo mức an toàn: nguyên nhân, các bước kiểm tra, dấu hiệu phải dừng.</div>
                  </div>
                </div>
              </Reveal>

              <Reveal className="bento--tall" delay={80}>
                <div className="bento-cell" style={{ height: "100%" }}>
                  <span className="icon-chip warn"><IconGauge /></span>
                  <h3>Ba mức rủi ro rõ ràng</h3>
                  <p>Màu luôn đi kèm chữ, không bắt bạn đoán.</p>
                  <div className="bento-risk">
                    <div className="row">Nguy cơ thấp <span className="risk-meter low"><i /><i /><i /></span></div>
                    <div className="row">Cần thận trọng <span className="risk-meter med"><i /><i /><i /></span></div>
                    <div className="row">Nguy hiểm — dừng <span className="risk-meter high"><i /><i /><i /></span></div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="bento-cell">
                  <span className="icon-chip"><IconCamera /></span>
                  <h3>Phân tích kèm hình ảnh</h3>
                  <p>Tải 1–3 ảnh để AI có thêm ngữ cảnh về tình trạng thiết bị.</p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bento-cell">
                  <span className="icon-chip danger"><IconStop /></span>
                  <h3>Dấu hiệu phải dừng</h3>
                  <p>Mùi khét, tia lửa, dây điện hở — biết chính xác lúc nào ngừng lại.</p>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="bento-cell">
                  <span className="icon-chip teal"><IconBook /></span>
                  <h3>Nguồn đã kiểm duyệt</h3>
                  <p>AI chỉ dùng hướng dẫn đã duyệt, không tự tạo nguồn không tồn tại.</p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bento-cell">
                  <span className="icon-chip"><IconHistory /></span>
                  <h3>Lịch sử &amp; phản hồi</h3>
                  <p>Mọi lượt kiểm tra được lưu lại để bạn theo dõi kết quả xử lý.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== Bảng so sánh ===== */}
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="kicker">So sánh</span>
                <h2>Kiểm tra bằng Trợ Sửa AI vs mang thẳng ra tiệm</h2>
                <p>
                  Trợ Sửa AI không thay thế tiệm sửa — nhưng giúp bạn đến tiệm
                  đúng lúc, với đúng thông tin.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="compare-wrap">
                <table className="compare">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="hl">Kiểm tra bằng Trợ Sửa AI</th>
                      <th>Mang thẳng ra tiệm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Chi phí kiểm tra ban đầu</td>
                      <td className="hl"><span className="yes"><IconCheck width={17} height={17} /> Miễn phí</span></td>
                      <td><span className="mid">Thường mất phí kiểm tra</span></td>
                    </tr>
                    <tr>
                      <td>Thời gian nhận đánh giá</td>
                      <td className="hl"><span className="yes"><IconCheck width={17} height={17} /> Khoảng 1 phút, tại nhà</span></td>
                      <td><span className="mid">Phải tháo lắp, di chuyển, chờ đợi</span></td>
                    </tr>
                    <tr>
                      <td>Biết mức độ nguy hiểm trước</td>
                      <td className="hl"><span className="yes"><IconCheck width={17} height={17} /> 3 mức rõ ràng kèm cảnh báo</span></td>
                      <td><span className="no"><IconX width={17} height={17} /> Chỉ biết sau khi thợ xem</span></td>
                    </tr>
                    <tr>
                      <td>Lưu lịch sử để theo dõi</td>
                      <td className="hl"><span className="yes"><IconCheck width={17} height={17} /> Có, kèm phản hồi kết quả</span></td>
                      <td><span className="no"><IconX width={17} height={17} /> Không</span></td>
                    </tr>
                    <tr>
                      <td>Sửa lỗi phức tạp bên trong</td>
                      <td className="hl"><span className="mid">Khuyến nghị đến kỹ thuật viên</span></td>
                      <td><span className="yes"><IconCheck width={17} height={17} /> Đúng nơi cần đến</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Prompt mẫu ===== */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="kicker">Thử ngay</span>
                <h2>Không biết mô tả thế nào? Bấm thử một triệu chứng</h2>
              </div>
            </Reveal>
            <Reveal>
              <PromptChips prompts={SAMPLE_PROMPTS} />
            </Reveal>
          </div>
        </section>

        {/* ===== Testimonials & Social Proof ===== */}
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="kicker">Người dùng nói gì</span>
                <h2>Được tin dùng bởi người dùng thử nghiệm và kỹ thuật viên</h2>
              </div>
            </Reveal>
            <div className="testi-grid">
              <Reveal delay={0}>
                <div className="testi">
                  <span className="stars">★★★★★</span>
                  <p>
                    "Quạt nhà tôi kêu ù không quay, làm theo 3 bước kiểm tra thì
                    phát hiện trục khô dầu. Tra dầu xong chạy lại luôn, đỡ mang
                    ra tiệm."
                  </p>
                  <div className="who">
                    <span className="av" style={{ background: "#06b6d4" }}>T</span>
                    <span><b>Anh Tuấn</b><span>Người dùng thử nghiệm · Biên Hòa</span></span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={90}>
                <div className="testi">
                  <span className="stars">★★★★★</span>
                  <p>
                    "Khách mang thiết bị đến kèm kết quả từ Trợ Sửa AI nên tôi
                    khoanh vùng lỗi nhanh hơn hẳn. Phần cảnh báo an toàn viết
                    rất có trách nhiệm."
                  </p>
                  <div className="who">
                    <span className="av" style={{ background: "#8b5cf6" }}>H</span>
                    <span><b>Chú Hải</b><span>Kỹ thuật viên điện gia dụng</span></span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={180}>
                <div className="testi">
                  <span className="stars">★★★★★</span>
                  <p>
                    "Nồi cơm nhảy nút sớm, hệ thống chỉ ra đáy nồi cong và bảo
                    tôi lau mâm nhiệt trước. Không ngờ tự xử được, lịch sử còn
                    lưu lại để theo dõi."
                  </p>
                  <div className="who">
                    <span className="av" style={{ background: "#B45309" }}>L</span>
                    <span><b>Chị Lan</b><span>Người dùng thử nghiệm · TP.HCM</span></span>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal>
              <div className="brand-strip" aria-label="Các thương hiệu thiết bị phổ biến được hỗ trợ">
                <span className="bl">Panasonic</span>
                <span className="bl">Senko</span>
                <span className="bl">Sunhouse</span>
                <span className="bl">Sharp</span>
                <span className="bl">Toshiba</span>
                <span className="bl">Kangaroo</span>
              </div>
              <p className="brand-note">
                Hỗ trợ kiểm tra thiết bị của các thương hiệu phổ biến — không
                phải đối tác chính thức.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <Reveal>
              <div className="section-head" style={{ textAlign: "center", maxWidth: "100%" }}>
                <span className="kicker">Câu hỏi thường gặp</span>
                <h2>Trước khi bắt đầu, bạn có thể muốn biết</h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="faq">
                <details>
                  <summary>Trợ Sửa AI có thay thế được thợ sửa chữa không?</summary>
                  <div className="faq-body">
                    Không. Hệ thống chỉ hỗ trợ kiểm tra ban đầu: tóm tắt sự cố,
                    nguyên nhân có thể xảy ra và mức độ nguy hiểm. Với lỗi phức
                    tạp hoặc nguy hiểm, kết quả luôn khuyến nghị bạn liên hệ kỹ
                    thuật viên.
                  </div>
                </details>
                <details>
                  <summary>Kết quả AI dựa trên nguồn nào?</summary>
                  <div className="faq-body">
                    AI chỉ được đối chiếu với kho hướng dẫn sửa chữa đã được
                    quản trị viên kiểm duyệt và có nguồn tài liệu rõ ràng — không
                    tự tạo nguồn không tồn tại.
                  </div>
                </details>
                <details>
                  <summary>Tôi có cần trả phí không?</summary>
                  <div className="faq-body">
                    Không. Đây là dự án học tập, việc đăng ký tài khoản và kiểm
                    tra ban đầu hoàn toàn miễn phí.
                  </div>
                </details>
                <details>
                  <summary>Ảnh tôi tải lên được dùng như thế nào?</summary>
                  <div className="faq-body">
                    Ảnh chỉ dùng để phân tích lượt chẩn đoán của bạn và không
                    được sử dụng để huấn luyện mô hình khi chưa có sự đồng ý.
                  </div>
                </details>
                <details>
                  <summary>Gặp mùi khét hoặc tia lửa thì làm gì trước?</summary>
                  <div className="faq-body">
                    Dừng sử dụng ngay, ngắt nguồn nếu có thể thực hiện an toàn
                    và liên hệ kỹ thuật viên. Đừng chờ kết quả phân tích — an
                    toàn của bạn luôn ưu tiên trước.
                  </div>
                </details>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Nguyên tắc an toàn ===== */}
        <section className="section" id="an-toan" style={{ paddingTop: 0 }}>
          <div className="container">
            <Reveal>
              <div className="safety-panel">
                <div className="hazard hazard--danger" />
                <div className="inner">
                  <div>
                    <span style={{ color: "#F5C14B", display: "block", marginBottom: 8, fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Nguyên tắc an toàn
                    </span>
                    <h2>Không phải sự cố nào cũng nên tự xử lý tại nhà</h2>
                    <p style={{ color: "#A9B8E4", marginBottom: 0 }}>
                      Trợ Sửa AI luôn đặt cảnh báo trước hướng dẫn và nói rõ khi
                      nào bạn nên dừng thao tác.
                    </p>
                  </div>
                  <div className="safety-cards">
                    <div className="sc">
                      <IconBolt />
                      <span><strong>Luôn ngắt nguồn</strong> trước khi kiểm tra bất kỳ thiết bị nào.</span>
                    </div>
                    <div className="sc">
                      <IconWrench />
                      <span><strong>Không tự sửa</strong> các vấn đề liên quan đến điện lưới, cháy, gas hoặc pin nguy hiểm.</span>
                    </div>
                    <div className="sc">
                      <IconStop />
                      <span><strong>Dừng thao tác ngay</strong> khi có mùi khét, tia lửa, dây điện hở hoặc thiết bị quá nóng.</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== CTA cuối trang ===== */}
        <section className="section" style={{ paddingTop: 6 }}>
          <div className="container cta-band cta-glow">
            <Reveal>
              <h2>Thiết bị của bạn đang gặp vấn đề gì?</h2>
              <p>
                Tạo tài khoản miễn phí, mô tả triệu chứng và nhận kết quả kiểm tra
                ban đầu chỉ trong một phút.
              </p>
              <Link className="btn btn--primary" href="/register">
                Bắt đầu kiểm tra
              </Link>
            </Reveal>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
