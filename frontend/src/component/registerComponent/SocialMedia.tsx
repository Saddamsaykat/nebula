const SocialMedia = () => {
  return (
    <div>
      {/* Facebook */}
      <div>
        <label htmlFor="facebook">Facebook</label>
        <input type="url" id="facebook" placeholder="Facebook" />
        <span className="text-red-500">Please enter a valid Facebook URL</span>
        <div className="text-sm">
          (Optional) Share your Facebook profile link here to connect with
          friends and family.
        </div>
      </div>
      {/* LinkedIn */}
      <div>
        <label htmlFor="linkedin">LinkedIn</label>
        <input type="url" id="linkedin" placeholder="LinkedIn" />
        <span className="text-red-500">Please enter a valid LinkedIn URL</span>
        <div className="text-sm">
          (Optional) Share your LinkedIn profile link here to connect with
          professionals.
        </div>
      </div>
      {/* Twitter */}
      <div>
        <label htmlFor="twitter">Twitter</label>
        <input type="url" id="twitter" placeholder="Twitter" />
        <span className="text-red-500">Please enter a valid Twitter URL</span>
        <div className="text-sm">
          (Optional) Share your Twitter profile link here to connect with the
          world.
        </div>
      </div>
      {/* Instagram */}
      <div>
        <label htmlFor="instagram">Instagram</label>
        <input type="url" id="instagram" placeholder="Instagram" />
        <span className="text-red-500">Please enter a valid Instagram URL</span>
        <div className="text-sm">
          (Optional) Share your Instagram profile link here to connect with the
          world.
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
