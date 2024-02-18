export default function Footer() {
  return (
    <>
        <footer className="py-4 bg-slate-200">
            <div className="max-w-6xl flex justify-between mx-auto">

            <div>
                <p className="text-gray-500 font-semibold text-lg">&copy; Estate Ease {new Date().getFullYear()}</p>
            </div>
            <div>
                <p className="text-gray-500 font-semibold text-lg">Designed by Rizil Maharjan</p>
            </div>
            </div>
        </footer>
    </>
  )
}