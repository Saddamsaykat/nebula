const Map = () => {
    return (
        <div className="w-full h-[450px]">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d916.508427103797!2d90.47193127842526!3d23.241860405230913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1743145022155!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default Map;
