const About = () => {
    return (
        <div className="px-6 py-12 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
                About the Alumni Association
            </h1>
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Welcome to the official Alumni Association page of <strong>Z.H. Sikder University of Science & Technology (ZHSUST)</strong>.
                    Our mission is to create a strong, vibrant network of former students who can stay connected, share opportunities, and contribute
                    to the growth of the university community.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                    The Alumni Association aims to:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Foster lifelong connections among alumni.</li>
                        <li>Promote collaboration and mentorship between alumni and current students.</li>
                        <li>Organize events, reunions, and professional development opportunities.</li>
                        <li>Support the university's vision and future through philanthropic efforts.</li>
                    </ul>
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                    Whether you graduated recently or decades ago, your voice and involvement matter. Together, we can celebrate our shared heritage and inspire future generations of ZHSUST students.
                </p>

                <div className="text-center mt-8">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow">
                        Join the Alumni Network
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
