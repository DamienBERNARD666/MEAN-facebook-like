<?php
namespace UtilisateursBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="Utilisateurs")
 */

class Utilisateurs extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    
    public function _construct()
    {
        parent::_construct();
    }
    
    /**
     * @ORM\OneToMany(targetEntity="CarnetBundle\Entity\Contact", mappedBy="utilisateur", cascade={"remove"})
     * @ORM\JoinColumn(nullable=true)
     */
    private $contact;
    
    /**
     * Add contact
     *
     * @param \CarnetBundle\Entity\Contact $contact
     *
     * @return Utilisateurs
     */
    public function addContact(\CarnetBundle\Entity\Contact $contact)
    {
        $this->contact[] = $contact;

        return $this;
    }

    /**
     * Remove contact
     *
     * @param \ContactBundle\Entity\Contact $contact
     */
    public function removeContact(\CarnetBundle\Entity\Contact $contact)
    {
        $this->contact->removeElement($contact);
    }

    /**
     * Get contact
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getContact()
    {
        return $this->contact;
    }
}