import ElementSpread from './ElementSpread'

interface ContentPanelProps {
    updateFlag: number
};

const ContentPanel = ({updateFlag}: ContentPanelProps) => {
    return (
        <section className="relative w-1/2 h-full flex flex-col p-6 bg-gradient-to-b from-[#6d9ac7] to-[#03054b] shadow-lg rounded-lg">
            <p className="text-lg font-bold text-white">Analysis</p>

            {/* Secondary Navbar
            <div className="mt-4 bg-[#202525] text-white p-3 rounded-lg text-center shadow-md">
                Secondary Navbar to Pick Content
            </div> */}

            {/* Content Card */}
            <div className="flex-grow bg-white rounded-lg p-6 mt-4 border shadow-lg">
                <ElementSpread updateFlag={updateFlag}/>
            </div>
        </section>
    )
}

export default ContentPanel