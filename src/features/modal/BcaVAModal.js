import React, { useState, useEffect } from "react";

export default function BcaVAModal({
  isOpen,
  onClose,
  selectedBank,
  totalPrice,
}) {
  const [accordionOpen, setAccordionOpen] = useState(null);
  const [remainingTime, setRemainingTime] = useState(86400);
  const [formattedTime, setFormattedTime] = useState("24:00:00");

  const copyToClipboard = () => {
    const virtualAccountInput = document.getElementById("virtualAccountInput");

    if (virtualAccountInput) {
      virtualAccountInput.select();
      document.execCommand("copy");
      virtualAccountInput.setSelectionRange(0, 0); // Deselect the text

      try {
        navigator.clipboard.writeText(virtualAccountInput.value);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const toggleAccordion = (index) => {
    if (index === accordionOpen) {
      setAccordionOpen(null);
    } else {
      setAccordionOpen(index);
    }
  };

  const accordionItems = [
    {
      title: "ATM BCA",
      content: `
      1. Masukkan Kartu ATM & PIN <br>
      2. Pilih Menu Transaksi Lainnya > Transfer > ke Rekening BCA Virtual Account <br>
      3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di akun anda 
      4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai <br>
      5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan <br>
      6. Ikuti transaksi untuk menyelesaikan transaksi <br>
      7. Simpan struk transaksi sebagai bukti pembayaran <br>
    `,
    },
    {
      title: "m-BCA (BCA Mobile)",
      content: `
      1. Masukkan Kartu ATM & PIN \n
      2. Pilih Menu Transaksi Lainnya > Transfer > ke Rekening BCA Virtual Account \n
      3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di akun anda \n
      4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai \n
      5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan \n
      6. Ikuti transaksi untuk menyelesaikan transaksi \n
      7. Simpan struk transaksi sebagai bukti pembayaran \n
    `,
    },
    {
      title: "Internet Banking BCA",
      content: `
      1. Masukkan Kartu ATM & PIN \n
      2. Pilih Menu Transaksi Lainnya > Transfer > ke Rekening BCA Virtual Account \n
      3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di akun anda \n
      4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai \n
      5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan \n
      6. Ikuti transaksi untuk menyelesaikan transaksi \n
      7. Simpan struk transaksi sebagai bukti pembayaran \n
    `,
    },
    {
      title: "Kantor Bank BCA",
      content: `
      1. Masukkan Kartu ATM & PIN \n
      2. Pilih Menu Transaksi Lainnya > Transfer > ke Rekening BCA Virtual Account \n
      3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di akun anda \n
      4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai \n
      5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan \n
      6. Ikuti transaksi untuk menyelesaikan transaksi \n
      7. Simpan struk transaksi sebagai bukti pembayaran \n
    `,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        setRemainingTime(remainingTime - 1);
        setFormattedTime(formattedTime);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-16 rounded w-[60%] h-[95%]">
        <div>
          <button
            className=" p-3 border-black border rounded-full text-bold text-orange-600"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className=" flex flex-col justify-center items-center top-0">
          <p className="text-lg font-semibold">Selesaikan Pembayaran Dalam</p>
          <p>
            <p>{formattedTime}</p>
          </p>
        </div>
        <div className="flex flex-col border rounded p-1 justify-between border-b-2">
          <div className="border-b flex flex-row justify-between">
            <h1 className="font-semibold  text-center text-lg text-gray-700">
              BCA Virtual Account
            </h1>
            <img
              className="w-12 mt-1"
              src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg"
              alt=""
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col py-5">
              <h6>Nomor Virtual Account</h6>
              <h1
                className="text-lg font-semibold text-orange-600"
                value="807708111443805"
              >
                807708111443805
              </h1>
            </div>
            <button
              className="text-orange-600 font-semibold text-md p-0 "
              onClick={copyToClipboard}
            >
              Salin
            </button>
          </div>
        </div>

        <div className="text-center">
          <button className="px-5 py-2 my-5 bg-white border-orange-600 border p-3 text-orange-600 font-semibold rounded hover:bg-gray-100 hover:shadow-md">
            Cek Status Pembayaran
          </button>
          <p className="p-2">Total:</p>
          <p className="p-2">
            {totalPrice === "Free"
              ? "Rp. 0 (FREE)"
              : formatter.format(totalPrice)}
          </p>{" "}
        </div>

        <div>
          {accordionItems.map((item, index) => (
            <div key={index} className="mb-2">
              <div
                className={`flex justify-between cursor-pointer  border-gray-200 ${
                  index === accordionOpen && "border-orange-600"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <h2 className="font-semibold py-2">{item.title}</h2>
                <svg
                  className={`w-4 h-4 mt-2 transition-transform transform ${
                    index === accordionOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {index === accordionOpen && (
                <div className="py-2">{item.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <input
        type="text"
        value="807708111443805"
        id="virtualAccountInput"
        style={{ position: "absolute", left: "-9999px" }}
        readOnly
      />
    </div>
  );
}